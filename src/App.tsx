import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { LandingPage } from "@/pages/LandingPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { ProjectFormPage } from "@/pages/ProjectFormPage";
import { PeoplePage } from "@/pages/PeoplePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SettingsPage } from "@/pages/SettingsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { MatchesPage } from "@/pages/MatchesPage";
import { SavedPage } from "@/pages/SavedPage";
import { AdminPage } from "@/pages/AdminPage";
import { AuthCallbackPage } from "@/pages/AuthCallbackPage";
import { GuidelinesPage, PrivacyPage } from "@/pages/LegalPages";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/new" element={<ProjectFormPage />} />
        <Route path="/projects/:slug/edit" element={<ProjectFormPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/settings/profile" element={<SettingsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/explore" element={<Navigate to="/projects" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-zinc-400">That link does not match a project or profile.</p>
    </div>
  );
}
