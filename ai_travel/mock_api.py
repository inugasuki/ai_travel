from typing import List, Dict

from .types import PlanningInfo

# This is a mock function to simulate searching available travel packages.
# In a real application, this would call external APIs.

def search_available_packages(info: PlanningInfo) -> List[Dict[str, str]]:
    # For simplicity, return a static list using some of the provided info.
    base_package = {
        "destination": "沖縄",
        "price": info.budget_range,
        "dates": f"{info.start_date} - {info.end_date}",
        "people": f"大人{info.adults}名 子ども{info.children}名",
    }
    # Add details if available
    if info.lodging_type:
        base_package["lodging_type"] = info.lodging_type
    if info.transportation:
        base_package["transportation"] = info.transportation
    if info.activities:
        base_package["activities"] = ",".join(info.activities)

    return [base_package]
