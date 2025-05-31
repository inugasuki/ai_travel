from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class PlanningInfo:
    budget_range: str
    start_date: str
    end_date: str
    adults: int
    children: int = 0
    lodging_type: Optional[str] = None
    transportation: Optional[str] = None
    activities: List[str] = field(default_factory=list)
