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
const planDetails = loadData('staticPlanDetails.json');
const sliderItems = loadData('staticSliderItems.json');

// GET /api/categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// GET /api/slider-items
app.get('/api/slider-items', (req, res) => {
  res.json(sliderItems);
});

// POST /api/plans/quick-suggest
app.post('/api/plans/quick-suggest', (req, res) => {
  const { category, duration } = req.body;

  const filtered = plans.filter((plan) => {
    if (category && plan.category !== category) {
      return false;
    }
    if (duration && plan.duration !== duration) {
      return false;
    }
    return true;
  });

  res.json(filtered);
});

// GET /api/plans/:planId
app.get('/api/plans/:planId', (req, res) => {
  const { planId } = req.params;
  const plan = plans.find((p) => p.id === planId);
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }
  const detail = planDetails.find((d) => d.id === planId) || {};
  res.json({ ...plan, ...detail });
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
  }

  res.json({
    planId: plan.id,
    likeCount: plan.likeCount,
    dislikeCount: plan.dislikeCount,
    isFavorite: action === 'favorite' ? true : false,
  });
});

// POST /api/plans/:planId/action (alias)
app.post('/api/plans/:planId/action', (req, res) => {
  const { planId } = req.params;
  const { actionType } = req.body;
  const plan = plans.find((p) => p.id === planId);
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }
  if (actionType === 'like') {
    plan.likeCount += 1;
  } else if (actionType === 'dislike') {
    plan.dislikeCount += 1;
  }
  res.json({ planId: plan.id, likeCount: plan.likeCount, dislikeCount: plan.dislikeCount });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});
