import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { PageLoader } from "@/components/ui/spinner";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const LoginPage = lazy(() => import("@/pages/login"));
const SignUpPage = lazy(() => import("@/pages/sign-up"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const AgentsPage = lazy(() => import("@/pages/agents"));
const OverviewPage = lazy(() => import("@/pages/overview"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 30_000, retry: 1 },
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ScrollToTop />
				<Suspense fallback={<PageLoader />}>
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/sign-up" element={<SignUpPage />} />
						<Route element={<AppLayout />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/dashboard/:categoryId/agents" element={<AgentsPage />} />
  <Route path="/dashboard/:categoryId/agents/:id/overview" element={<OverviewPage />} />
</Route>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
			<ToastProvider />
		</QueryClientProvider>
	);
}
