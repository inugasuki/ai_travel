import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import DetailPage from './pages/detail';
import { QuickSuggestPage } from './components/QuickSuggestPage';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/quick-suggest" element={<QuickSuggestPage />} />
    <Route path="/detail" element={<DetailPage />} />
  </Routes>
);
