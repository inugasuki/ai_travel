from typing import List, Dict, Optional

# Static table of recommended plans
PLANS = [
    {
        "destination": "箱根",
        "tag": "温泉",
        "style": "のんびり",
        "days": 2,
        "budget": "3-5万円",
    },
    {
        "destination": "熱海",
        "tag": "ビーチ",
        "style": "グルメ",
        "days": 2,
        "budget": "3-5万円",
    },
    {
        "destination": "京都",
        "tag": "都市観光",
        "style": "歴史巡り",
        "days": 3,
        "budget": "5-7万円",
    },
    {
        "destination": "沖縄",
        "tag": "ビーチ",
        "style": "アクティブ",
        "days": 3,
        "budget": "7-10万円",
    },
    {
        "destination": "札幌",
        "tag": "都市観光",
        "style": "グルメ",
        "days": 3,
        "budget": "5-7万円",
    },
]


def suggest_plans(
    tag: str,
    style: str,
    *,
    days: Optional[int] = None,
    budget: Optional[str] = None,
    limit: int = 3,
) -> List[Dict[str, str]]:
    """Return a list of suggested plans ranked by how well they match."""

    # First look for exact matches on tag and style
    exact = [p for p in PLANS if p["tag"] == tag and p["style"] == style]
    if exact:
        return exact[:limit]

    def score(plan: Dict[str, str]) -> int:
        s = 0
        if plan["tag"] == tag:
            s += 2
        if plan["style"] == style:
            s += 1
        if days is not None and plan.get("days") == days:
            s += 1
        if budget is not None and plan.get("budget") == budget:
            s += 1
        return s

    scored = [(score(p), p) for p in PLANS]
    scored = [item for item in scored if item[0] > 0]

    tag_matches = [item for item in scored if item[1]["tag"] == tag]

    if tag_matches:
        scored = tag_matches
    elif not scored:
        scored = [(2, p) for p in PLANS if p["tag"] == tag]

    scored.sort(key=lambda x: x[0], reverse=True)
    return [p for _, p in scored[:limit]]
