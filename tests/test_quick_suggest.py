from ai_travel.quick_suggest import suggest_plans


def test_suggest_plans_exact_match():
    plans = suggest_plans("ビーチ", "アクティブ")
    assert len(plans) > 0
    for p in plans:
        assert p["tag"] == "ビーチ"
        assert p["style"] == "アクティブ"


def test_suggest_plans_fallback():
    plans = suggest_plans("温泉", "アクティブ")
    # No plan has 温泉 + アクティブ, fallback should match 温泉 only
    assert len(plans) > 0
    for p in plans:
        assert p["tag"] == "温泉"
