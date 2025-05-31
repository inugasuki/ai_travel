from typing import List

from .quick_suggest import suggest_plans
from .planning import collect_planning_info, plan_trip, PlanningInfo


def show_suggestions() -> None:
    print("== クイックサジェスト ==")
    tag = input("行き先イメージタグ (温泉/ビーチ/都市観光): ")
    style = input("好きな旅行スタイル (のんびり/アクティブ/グルメ/歴史巡り): ")
    plans = suggest_plans(tag, style)
    if not plans:
        print("該当するプランが見つかりませんでした。")
        return
    for idx, p in enumerate(plans, 1):
        print(f"[{idx}] {p['destination']} {p['days']}日 {p['budget']}")
    choice = input("このプランを詳しく詰めますか？ (y/n): ")
    if choice.lower().startswith('y'):
        info = collect_planning_info()
        results = plan_trip(info)
        print_results(results)


def print_results(results: List[dict]) -> None:
    print("\n-- 予約候補一覧 --")
    for r in results:
        for k, v in r.items():
            print(f"{k}: {v}")
        print("---")


def main() -> None:
    while True:
        print("\n1) クイックサジェスト")
        print("2) じっくりプランニング")
        print("0) 終了")
        choice = input("選択してください: ")
        if choice == '1':
            show_suggestions()
        elif choice == '2':
            info = collect_planning_info()
            results = plan_trip(info)
            print_results(results)
        elif choice == '0':
            break
        else:
            print("無効な選択です。")


if __name__ == "__main__":
    main()
