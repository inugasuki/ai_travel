import React from 'react';
import { Navigate } from 'react-router-dom';

export default function IndexPage() {
  return <Navigate to="/quick-suggest" replace />;
}
