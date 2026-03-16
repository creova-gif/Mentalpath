import { createBrowserRouter, Navigate } from "react-router";
import { Landing } from "./components/pages/Landing";
import { ClientPortal } from "./components/pages/ClientPortal";
import { ClientPortalFull } from "./components/pages/ClientPortalFull";
import { Onboarding } from "./components/pages/Onboarding";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Overview } from "./components/pages/Overview";
import { Clients } from "./components/pages/Clients";
import { SessionNotes } from "./components/pages/SessionNotes";
import { Billing } from "./components/pages/Billing";
import { CalendarView } from "./components/pages/CalendarView";
import { Messages } from "./components/pages/Messages";
import { CulturalTemplates } from "./components/pages/CulturalTemplates";
import { Settings } from "./components/pages/Settings";
import { Compliance } from "./components/pages/Compliance";
import { ClinicalTools } from "./components/pages/ClinicalTools";
import { SessionPrep } from "./components/pages/SessionPrep";
import { OutcomeMeasures } from "./components/pages/OutcomeMeasures";
import { Waitlist } from "./components/pages/Waitlist";
import { TherapistWellbeing } from "./components/pages/TherapistWellbeing";

// Simple error boundary fallback
function ErrorBoundary() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>Please try refreshing the page.</p>
      <a href="/" style={{ color: '#4a7c6f', textDecoration: 'underline' }}>Go to Home</a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/portal",
    element: <ClientPortal />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/portal-full",
    element: <ClientPortalFull />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/wellbeing",
    element: <TherapistWellbeing />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: <Onboarding />,
    errorElement: <ErrorBoundary />,
  },
  // Redirects for old routes to new dashboard routes
  {
    path: "/clients",
    element: <Navigate to="/dashboard/clients" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/notes",
    element: <Navigate to="/dashboard/notes" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/billing",
    element: <Navigate to="/dashboard/billing" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/calendar",
    element: <Navigate to="/dashboard/calendar" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/messages",
    element: <Navigate to="/dashboard/messages" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/settings",
    element: <Navigate to="/dashboard/settings" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/compliance",
    element: <Navigate to="/dashboard/compliance" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Overview /> },
      { path: "clients", element: <Clients /> },
      { path: "notes", element: <SessionNotes /> },
      { path: "billing", element: <Billing /> },
      { path: "calendar", element: <CalendarView /> },
      { path: "messages", element: <Messages /> },
      { path: "settings", element: <Settings /> },
      { path: "compliance", element: <Compliance /> },
      { path: "cultural-templates", element: <CulturalTemplates /> },
      { path: "clinical-tools", element: <ClinicalTools /> },
      { path: "session-prep", element: <SessionPrep /> },
      { path: "outcome-measures", element: <OutcomeMeasures /> },
      { path: "waitlist", element: <Waitlist /> },
    ],
  },
  // Catch-all redirect to landing page
  {
    path: "*",
    element: <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />,
  },
]);