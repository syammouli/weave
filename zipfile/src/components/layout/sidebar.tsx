import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface SidebarItem {
	label: string;
	href: string;
	icon: React.ReactNode;
}

const NAV_ITEMS: SidebarItem[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: <DashboardRoundedIcon sx={{ fontSize: 18 }} />,
	},
	{ label: "Agents", href: "/agents", icon: <SmartToyRoundedIcon sx={{ fontSize: 18 }} /> },
	{ label: "AI Metrics", href: "/ai-metrics", icon: <BarChartRoundedIcon sx={{ fontSize: 18 }} /> },
];

const BOTTOM_ITEMS: SidebarItem[] = [];

interface SidebarProps {
	collapsed: boolean;
	onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
	return (
		<nav
			aria-label="Main navigation"
			className={cn(
				"flex flex-col h-screen bg-[#0f0e22] text-white",
				"transition-all duration-300 ease-in-out",
				collapsed ? "w-[4.5rem]" : "w-[16.25rem]",
			)}
		>
			{/* Logo */}
			<div
				className={cn(
					"flex items-center h-16 shrink-0 border-b border-white/10",
					collapsed ? "justify-center px-0" : "px-5",
				)}
			>
				{collapsed ? (
					<div className="flex items-center justify-center w-9 h-9 bg-orange-500 rounded-lg">
						<span className="font-bold text-sm text-white">W</span>
					</div>
				) : (
					<div className="flex items-center gap-2.5">
						<div className="flex items-center justify-center w-9 h-9 bg-orange-500 rounded-lg shrink-0">
							<span className="font-bold text-sm text-white">W</span>
						</div>
						<div>
							<p className="font-bold text-sm leading-none text-white">
								Weave Agent
							</p>
							<p className="text-xs text-white/50 mt-0.5">AI Marketplace</p>
						</div>
					</div>
				)}
			</div>

			{/* Nav items */}
			<div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
				{NAV_ITEMS.map((item) => (
					<NavItem key={item.href} item={item} collapsed={collapsed} />
				))}
			</div>

			{/* Bottom items */}
			<div className="border-t border-white/10 py-4 flex flex-col gap-1 px-3">
				{BOTTOM_ITEMS.map((item) => (
					<NavItem key={item.href} item={item} collapsed={collapsed} />
				))}
			</div>

			{/* Toggle button */}
			<div className={cn("pb-4 flex", collapsed ? "justify-center" : "px-3")}>
				<button
					type="button"
					onClick={onToggle}
					aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
					className="flex items-center justify-center w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
				>
					{collapsed ? <ChevronRightRoundedIcon sx={{ fontSize: 16 }} /> : <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />}
				</button>
			</div>
		</nav>
	);
};

const NavItem = ({
	item,
	collapsed,
}: {
	item: SidebarItem;
	collapsed: boolean;
}) => {
	const { pathname } = useLocation();
	const isActive =
		pathname === item.href || pathname.startsWith(`${item.href}/`);

	return (
		<Link
			to={item.href}
			aria-label={collapsed ? item.label : undefined}
			aria-current={isActive ? "page" : undefined}
			title={collapsed ? item.label : undefined}
			className={cn(
				"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
				isActive
					? "bg-orange-500/15 text-orange-400"
					: "text-white/60 hover:text-white hover:bg-white/8",
				collapsed && "justify-center px-0 w-10 h-10 mx-auto",
			)}
		>
			<span className={cn("shrink-0", isActive && "text-orange-400")}>
				{item.icon}
			</span>
			{!collapsed && <span className="truncate">{item.label}</span>}
		</Link>
	);
};
