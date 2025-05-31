from typing import List, Optional, Dict

from .types import PlanningInfo
from .mock_api import search_available_packages


def prompt_optional(prompt: str) -> Optional[str]:
    value = input(f"{prompt} (Enter to skip): ")
    return value or None


def collect_planning_info() -> PlanningInfo:
    print("== 詳細プランニング ==")
    budget = input("予算レンジ（例：1人あたり3-5万円）: ")
    start = input("チェックイン日 (YYYY-MM-DD): ")
    end = input("チェックアウト日 (YYYY-MM-DD): ")
    adults = int(input("大人の人数: "))
    children = int(input("子どもの人数 (いなければ0): "))

    lodging = prompt_optional("宿タイプ (ホテル/旅館/民泊など)")
    transport = prompt_optional("移動手段 (飛行機/新幹線/レンタカーなど)")
    act = prompt_optional("興味のあるアクティビティ (カンマ区切り)")
    activities = act.split(',') if act else []

    return PlanningInfo(
        budget_range=budget,
        start_date=start,
        end_date=end,
        adults=adults,
        children=children,
        lodging_type=lodging,
        transportation=transport,
        activities=activities,
    )


def plan_trip(info: PlanningInfo) -> List[Dict[str, str]]:
    return search_available_packages(info)
