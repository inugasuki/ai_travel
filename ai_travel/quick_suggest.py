from typing import List, Dict

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


def suggest_plans(tag: str, style: str, limit: int = 3) -> List[Dict[str, str]]:
    """Return a list of suggested plans matching the tag and style."""
    matches = [p for p in PLANS if p["tag"] == tag and p["style"] == style]
    if not matches:
        # fallback to plans that match the tag only
        matches = [p for p in PLANS if p["tag"] == tag]
    return matches[:limit]
