from ai_travel.mock_api import search_available_packages
from ai_travel.planning import PlanningInfo


def test_search_available_packages_basic():
    info = PlanningInfo(
        budget_range="3-5万円",
        start_date="2023-12-01",
        end_date="2023-12-03",
        adults=2,
        children=0,
    )
    results = search_available_packages(info)
    assert isinstance(results, list)
    assert results[0]["destination"] == "沖縄"
    assert results[0]["price"] == "3-5万円"
