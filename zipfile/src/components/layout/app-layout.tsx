import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import RTlogo from "@/assets/RT-logo.svg";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Box } from "@mui/material";
import landingBg from "@/assets/module/market-place/Landing.svg";

export const AppLayout = () => {
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const location = useLocation();
	const showDashboardFooter = location.pathname === "/dashboard";
	const isAgentsRoute = location.pathname.includes("/agents") || location.pathname.includes("/overview");

	return (
		<div className="flex h-screen overflow-hidden ">
			{/* Mobile sidebar overlay */}
			{mobileSidebarOpen && (
				<div className="lg:hidden fixed inset-0 z-40 flex">
					<div
						className="absolute inset-0 bg-black/50"
						aria-hidden="true"
						onClick={() => setMobileSidebarOpen(false)}
					/>
					<div className="relative z-50">
						<Sidebar
							collapsed={false}
							onToggle={() => setMobileSidebarOpen(false)}
						/>
					</div>
				</div>
			)}

			{/* Main content */}
			<Box
			    // 
				className={`flex flex-col flex-1 min-w-0 ${isAgentsRoute ? "overflow-hidden" : "overflow-y-auto"}`}
				sx={{
					background: `url(${landingBg})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<Header
					showMenuButton
					onMenuToggle={() => setMobileSidebarOpen((o) => !o)}
				/>
				<main id="main-content" className="flex-1">
					<Outlet />
				</main>
				{showDashboardFooter && (
					<footer className="px-12 h-[52px] flex items-end justify-between bg-transparent">
						<div className="h-full flex items-center">
						<p className="text-[#000] font-['Inter',sans-serif] text-[10.5px] not-italic font-normal leading-normal">
							© 2026 All rights reserved
						</p>
					</div>
					<div className="h-[44px] flex items-center">
						<img src={RTlogo} alt="Powered by RandomTrees" className="h-[44px] w-auto" />
					</div>
					<div className="h-full flex items-center">
						<div className="text-[#000] font-['Inter',sans-serif] text-[10.5px] not-italic font-normal leading-normal flex items-center gap-3">
							<a href="#" className="hover:underline">
								Terms of Service
							</a>
							<span className="text-[rgba(0,0,0,0.3)]">|</span>
							<a href="#" className="hover:underline">
								Privacy Policy
							</a>
						</div>
					</div>
					</footer>
				)}
			</Box>
			{!showDashboardFooter && (
				<img
					src={RTlogo}
					alt=""
					aria-hidden="true"
					className="fixed bottom-0 right-1 z-50 pointer-events-none"
				/>
			)}
		</div>
	);
};
