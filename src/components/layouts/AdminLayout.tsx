// src/components/layout/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
export const AdminLayout = () => {
  return (
    <div className="admin-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
};