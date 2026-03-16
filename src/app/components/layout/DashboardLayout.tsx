import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-[230px] flex-1 flex flex-col min-h-screen">
        <Topbar />
        <div className="p-7 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
