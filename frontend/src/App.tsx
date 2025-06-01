import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index';
import DetailPage from './pages/detail';
import { QuickSuggestPage } from './components/QuickSuggestPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => (
  <BrowserRouter>
    <FavoritesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/quick-suggest" element={<QuickSuggestPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
      <Footer />
    </FavoritesProvider>
  </BrowserRouter>
);
