"""Merge a CSV exported from your inventory sheet into data/data.json.

Usage (from the portfolio folder):
    python tools/sheet_to_json.py projects.csv

Sheet: File > Download > Comma Separated Values (.csv).
Existing projects are matched by their Link (live demo). For those, only
type, summary, stack, date and links are updated from the sheet.
Title, featured, images, note and the case study are never touched.
"""
import csv, json, re, shutil, sys
from datetime import datetime
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data" / "data.json"
TYPES = {"school", "personal", "workshop"}
DATE_FORMATS = ["%d-%b-%y", "%B %d, %Y", "%b %d, %Y", "%B %Y", "%b %Y", "%m/%d/%Y", "%Y-%m-%d"]


def col(row, key):
    for header, value in row.items():
        if header and header.strip().lower().startswith(key):
            return (value or "").strip()
    return ""


def parse_stack(text):
    text = re.sub(r"\([^)]*\)", "", text)
    items = [re.sub(r"^and\s+", "", x.strip(), flags=re.I).strip(" .") for x in text.split(",")]
    return [x for x in items if x]


def parse_date(text):
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(text, fmt).strftime("%b %Y")
        except ValueError:
            pass
    return text


def parse_repo(text):
    # CSV export keeps a cell's display text, not its URL, so "owner/repo: desc" becomes a GitHub URL
    if text.startswith("http"):
        return text
    m = re.match(r"^([\w.-]+/[\w.-]+)", text)
    return f"https://github.com/{m.group(1)}" if m else ""


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    data = json.loads(DATA.read_text(encoding="utf-8"))
    projects = data["projects"]
    norm = lambda u: (u or "").rstrip("/").lower()
    by_demo = {norm(p["links"].get("demo")): p for p in projects if p.get("links", {}).get("demo")}
    by_id = {p["id"]: p for p in projects}
    added = updated = 0

    with open(sys.argv[1], newline="", encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            name, kind = col(row, "name"), col(row, "type").lower()
            if not name or name.lower().startswith("example"):
                continue
            if kind == "cert":
                print(f"skipped (certs live in the Achievement Log): {name}")
                continue
            if kind not in TYPES:
                print(f"skipped (pick a Type from the dropdown): {name}")
                continue
            demo, repo = col(row, "link"), parse_repo(col(row, "repo"))
            slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
            p = by_demo.get(norm(demo)) if demo else None
            p = p or by_id.get(slug)
            if p is None:
                p = {"id": slug, "title": name, "type": kind, "featured": False, "summary": "", "stack": [], "links": {"demo": "", "repo": ""}}
                projects.append(p)
                added += 1
            else:
                updated += 1
            p["type"] = kind
            for key, value in (("summary", col(row, "one-line")), ("stack", parse_stack(col(row, "stack"))), ("date", parse_date(col(row, "date")))):
                if value:
                    p[key] = value
            for key, value in (("demo", demo), ("repo", repo)):
                if value:
                    p["links"][key] = value
            if not p["summary"]:
                print(f"note: '{name}' has no one-line summary yet")

    shutil.copy(DATA, DATA.with_suffix(".json.bak"))
    DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Done. Added {added}, updated {updated}. Backup saved as data.json.bak")


if __name__ == "__main__":
    main()
