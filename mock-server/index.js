const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load data
function loadData(file) {
  const filePath = path.join(__dirname, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const categories = loadData('staticCategories.json');
const plans = loadData('staticPlans.json');
const favorites = new Set();

// GET /api/categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// POST /api/plans/quick-suggest
app.post('/api/plans/quick-suggest', (req, res) => {
  const {
    category,
    budgetMin,
    budgetMax,
    duration,
    adultCount,
    childCount,
    styles,
  } = req.body;

  const filtered = plans.filter((plan) => {
    if (category && plan.category !== category) {
      return false;
    }
    if (duration && plan.duration !== duration) {
      return false;
    }
    if (typeof budgetMin === 'number' && plan.budgetRange.max < budgetMin) {
      return false;
    }
    if (typeof budgetMax === 'number' && plan.budgetRange.min > budgetMax) {
      return false;
    }
    if (typeof adultCount === 'number' && plan.persons.adult < adultCount) {
      return false;
    }
    if (typeof childCount === 'number' && plan.persons.child < childCount) {
      return false;
    }
    if (Array.isArray(styles) && styles.length > 0) {
      const planStyles = plan.styles || [];
      if (!styles.some((s) => planStyles.includes(s))) {
        return false;
      }
    }
    return true;
  });

  const result = filtered.map((p) => ({
    ...p,
    isFavorite: favorites.has(p.id),
  }));

  res.json(result);
});

// POST /api/plans/:planId/interact
app.post('/api/plans/:planId/interact', (req, res) => {
  const { planId } = req.params;
  const { action } = req.body;

  const plan = plans.find((p) => p.id === planId);
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }

  if (action === 'like') {
    plan.likeCount += 1;
  } else if (action === 'dislike') {
    plan.dislikeCount += 1;
  } else if (action === 'favorite') {
    if (favorites.has(planId)) {
      favorites.delete(planId);
    } else {
      favorites.add(planId);
    }
  }

  res.json({
    planId: plan.id,
    likeCount: plan.likeCount,
    dislikeCount: plan.dislikeCount,
    isFavorite: favorites.has(planId),
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});
