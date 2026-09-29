import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import bellIcon from "@/assets/FrameBell.svg";
import headerWeave from "@/assets/headerWeave.svg";
import profileIcon from "@/assets/profilePic.svg";
import question from "@/assets/question.svg";
import settingsIcon from "@/assets/settings.svg";
import moonIcon from "@/assets/moon.svg";
import logoutIcon from "@/assets/logout.svg";
import nextArrowIcon from "@/assets/next-arrow.svg";
import waveAgentLetter from "@/assets/wave-agent-letter.png";
import dotCircle from "@/assets/dot-cirlce.svg";
import dotSquare from "@/assets/dot-square.svg";
import cloudIcon from "@/assets/cloud.svg";
import codeIcon from "@/assets/code.svg";
import connectCircuitIcon from "@/assets/connect-circuit.svg";
import layersIcon from "@/assets/Layers.svg";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import img1 from "@/assets/img1.svg";
import { useLogoutMutation } from "@/hooks/useAuthMutations";
import { useAuthStore } from "@/store/auth";

interface HeaderProps {
	onMenuToggle?: () => void;
	showMenuButton?: boolean;
}

export const Header = ({ onMenuToggle, showMenuButton }: HeaderProps) => {
	const { user } = useAuthStore();
	const logoutMutation = useLogoutMutation();
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [browseMenuOpen, setBrowseMenuOpen] = useState(false);
	const [activeBrowseIndex, setActiveBrowseIndex] = useState<number | null>(null);
	const [browseDirection, setBrowseDirection] = useState<"forward" | "backward">("forward");
	const [transitioningFromIndex, setTransitioningFromIndex] = useState<number | null>(null);
	const browseMenuRef = useRef<HTMLDivElement | null>(null);
	const profileMenuRef = useRef<HTMLDivElement | null>(null);

	const handleLogout = () => logoutMutation.mutate();

	const fullName = user
		? `${user.first_name} ${user.last_name}`.trim() || user.username
		: "";
	const userRole = user?.role || "Ui Ux Designer";	
	const browseSections = [
		{
			label: "Enterprise AI",
			count: 114,
			icon: cloudIcon,
			description:
				"Unlocks industry specific transformation by deploying AI agents that optimize supply chains, generate actionable customer insights, and enhance operational efficiency through intelligent automation.",
			image: img1,
		},
		{
			label: "Industrial AI",
			count: 24,
			icon: connectCircuitIcon,
			description:
				"Industrial AI Agents unify Computer Vision, IOT, and Industry specific intelligence into curated autonomous agents for real-time operational optimization.",
			image: img2,
		},
		{
			label: "Data Engineering",
			count: 47,
			icon: layersIcon,
			description:
				"Strengthens data infrastructure and governance by enabling seamless data migration and ensuring high-quality, validated data pipelines through specialized data engineering agents.",
			image: img3,
		},
		{
			label: "Productivity",
			count: 37,
			icon: codeIcon,
			description:
				"Empowers enterprises to accelerate digital initiatives by automating critical development workflows such as ETL migration, code conversion, document generation, and code creation using intelligent productivity agents.",
			image: img4,
		},
	];

	const transitionToBrowseIndex = (nextIndex: number) => {
		if (nextIndex < 0 || nextIndex >= browseSections.length) return;
		setActiveBrowseIndex((current) => {
			if (current === nextIndex) return null;
			if (current !== null) {
				setTransitioningFromIndex(current);
				setBrowseDirection(nextIndex > current ? "forward" : "backward");
			} else {
				setBrowseDirection("forward");
			}
			return nextIndex;
		});
	};
	const visibleRangeStart =
		activeBrowseIndex === null
			? 0
			: browseDirection === "forward"
				? activeBrowseIndex < browseSections.length - 1
					? activeBrowseIndex
					: Math.max(0, activeBrowseIndex - 1)
				: activeBrowseIndex > 0
					? activeBrowseIndex - 1
					: 0;
	const visibleBrowseSections =
		activeBrowseIndex === null
			? browseSections
			: browseSections.slice(
				visibleRangeStart,
				Math.min(browseSections.length, visibleRangeStart + 2),
			);

	useEffect(() => {
		if (transitioningFromIndex === null) return;
		const timeout = window.setTimeout(() => {
			setTransitioningFromIndex(null);
		}, 460);
		return () => window.clearTimeout(timeout);
	}, [transitioningFromIndex]);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as Node;
			const clickedInsideBrowse =
				browseMenuRef.current?.contains(target) ?? false;
			const clickedInsideProfile =
				profileMenuRef.current?.contains(target) ?? false;

			if (!clickedInsideBrowse && !clickedInsideProfile) {
				setBrowseMenuOpen(false);
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<header className="flex items-center shadow-[0_1px_5px_0_rgba(0,0,0,0.10)] backdrop-blur-[12px] border-b-[1.5px] border-b-white border-solid bg-[rgba(255,255,255,0.34)] sticky top-0 left-0 z-30 h-[60px] justify-between px-[38px] py-[11px]">
			{showMenuButton && (
				<button
					type="button"
					onClick={onMenuToggle}
					aria-label="Toggle menu"
					className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors lg:hidden"
				>
					<MenuRoundedIcon sx={{ fontSize: 20 }} />
				</button>
			)}

			<div className="flex-1 min-w-0">
				<div onClick={() => navigate("/dashboard")} className="flex items-center gap-2 cursor-pointer w-max">
					{/* <h1 className="text-base font-semibold text-gray-900 leading-tight truncate">{title}</h1>
            {description && <p className="text-xs text-gray-500 mt-0.5 truncate">{description}</p>} */}
					<img
						src={headerWeave}
						alt="Weave Agents"
						className="cursor-pointer"
						width={100}
					/>
				</div>
			</div>

			<div className="flex items-center justify-end gap-[20px]">
				<div className="relative" ref={browseMenuRef}>
					<button
						type="button"
						onClick={() => {
							setBrowseMenuOpen((open) => !open);
							setDropdownOpen(false);
							if (!browseMenuOpen) {
								setActiveBrowseIndex(null);
							}
						}}
						className="group flex h-10 cursor-pointer items-center gap-4 rounded-[10px] px-2.5 transition-colors"
					>
						<span className="text-[13px] font-semibold leading-[1.1] uppercase text-black">
							Browse agents
						</span>
						<span className="relative flex h-[39px] w-[39px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
							<img
								src={dotSquare}
								alt=""
								aria-hidden="true"
								className="absolute h-[26px] w-[26px] transition-all duration-300 ease-out group-hover:scale-90 group-hover:opacity-0 group-hover:rotate-12"
							/>
							<img
								src={dotCircle}
								alt=""
								aria-hidden="true"
								className="absolute h-[26px] w-[26px] opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0 scale-90 -rotate-12"
							/>
						</span>
					</button>

					{browseMenuOpen && (
						<div
							role="menu"
							aria-label="Browse agent categories"
							className="absolute right-0 top-full mt-2 z-20 w-[435px] max-w-[calc(100vw-20px)] overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.9)] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.22)]"
							style={{
								backgroundImage:
									"linear-gradient(90deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.18) 100%), linear-gradient(135deg, #E7D793 0%, #ECE9DC 58%, #F2F2F2 100%)",
							}}
						>
							<div className="relative pl-1.5 pr-0 py-1.5">
								{visibleBrowseSections.map((section, localIndex) => {
									const index =
										activeBrowseIndex === null
											? localIndex
											: visibleRangeStart + localIndex;
									const isOpen = activeBrowseIndex === index;
									return (
										<div key={section.label}>
											{transitioningFromIndex !== index && (
												<button
													type="button"
													role="menuitem"
													onClick={() => transitionToBrowseIndex(index)}
													className="group flex w-full cursor-pointer items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-left transition-colors"
												>
													<img src={section.icon} alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
													<span className="min-w-0 flex-1 text-[13px] font-semibold leading-none text-black">
														{section.label}
													</span>
													<span className="ml-3 rounded-[7px] border border-[#CBB355] bg-[#E2CD78] px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.24px] text-black">
														{section.count} agents
													</span>
													<img
														src={nextArrowIcon}
														alt=""
														aria-hidden="true"
														className="ml-3 h-[10px] w-[11px] shrink-0"
													/>
												</button>
											)}

											<AnimatePresence initial={false}>
												{isOpen && (
													<motion.div
														key={`${section.label}-expanded`}
														initial={{ y: 80, opacity: 0 }}
														animate={{ y: 0, opacity: 1 }}
														exit={{ y: -50, opacity: 0 }}
														transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
														className="relative min-h-[150px] px-3"
													>
														<div className="relative z-10 w-[58%] pt-[15px] pr-1">
															<p className="w-full text-[11px] leading-[1.8] text-black/90">
																{section.description}
															</p>
														</div>
														<div
															role="img"
															aria-label={`${section.label} visual`}
															className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[45%] bg-contain bg-center bg-no-repeat"
															style={{
																backgroundImage: `url(${section.image})`,
																WebkitMaskImage:
																	"linear-gradient(to right, transparent 0%, black 30%)",
																maskImage:
																	"linear-gradient(to right, transparent 0%, black 30%)",
															}}
														/>
													</motion.div>
												)}
											</AnimatePresence>

											{localIndex < visibleBrowseSections.length - 1 && (
												<div className="mx-4 mt-3 mb-2 h-px bg-black/10" />
											)}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>

				<div className="h-6 w-px bg-black/15" />
				<button
					type="button"
					aria-label="Notifications"
					className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] transition-colors hover:bg-black/[0.08]"
				>
					<img
						src={bellIcon}
						alt="Notifications"
						className="h-4.5 w-4.5"
					/>
				</button>
				<div className="h-6 w-px bg-black/15" />
				<button
					type="button"
					aria-label="Help"
					className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] transition-colors hover:bg-black/[0.08]"
				>
					<img
						src={question}
						alt="Help"
						className="h-4.5 w-4.5"
					/>
				</button>
				<div className="h-6 w-px bg-black/15" />

				{/* User dropdown */}
				<div className="relative" ref={profileMenuRef}>
					<button
						type="button"
						onClick={() => {
							setDropdownOpen((o) => !o);
							setBrowseMenuOpen(false);
						}}
						aria-expanded={dropdownOpen}
						aria-haspopup="menu"
						aria-label="User menu"
						className="flex items-center rounded-[999px] p-0.5 transition-colors hover:bg-black/[0.03]"
					>
						<img
							src={profileIcon}
							alt="User profile"
							className="h-9 w-9 cursor-pointer rounded-full object-cover"
						/>
					</button>

					{dropdownOpen && (
						<>
							<div
								role="menu"
								aria-label="User menu"
								className="absolute right-0 top-full mt-2 z-20 w-[316px] max-w-[calc(100vw-20px)] overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.9)] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.22)]"
								style={{
									backgroundImage:
										"linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%), linear-gradient(330.45deg, #EDEDED 52.87%, #E3D693 97.2%)",
								}}
							>
								<img
									src={waveAgentLetter}
									alt=""
									aria-hidden="true"
									className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 opacity-35"
								/>

								<div className="relative px-3.5 pt-3.5 pb-3">
									<div className="flex items-center gap-2.5">
										<img
											src={profileIcon}
											alt="Profile"
											className="h-9 w-9 rounded-full object-cover"
										/>
										<div className="min-w-0">
											<p className="truncate text-[14px] leading-[20px] font-semibold text-black uppercase">
												{fullName || user?.username || "User"}
											</p>
											<p className="truncate text-[12.5px] font-bold text-[#846C00]">
												{userRole}
											</p>
										</div>
									</div>
								</div>

								<div className="relative pb-2">
									<MenuOption
										icon={settingsIcon}
										label="AGENT SETTINGS"
										onClick={() => {
											navigate("/settings");
											setDropdownOpen(false);
										}}
										arrowIcon={nextArrowIcon}
									/>
									<MenuOption
										icon={moonIcon}
										label="DARK THEME"
										onClick={() => setDropdownOpen(false)}
										arrowIcon={nextArrowIcon}
									/>
									<MenuOption
										icon={logoutIcon}
										label="LOG OUT"
										onClick={handleLogout}
										arrowIcon={nextArrowIcon}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

const MenuOption = ({
	icon,
	label,
	onClick,
	arrowIcon,
}: {
	icon: string;
	label: string;
	onClick: () => void;
	arrowIcon: string;
}) => (
	<button
		type="button"
		role="menuitem"
		onClick={onClick}
		className="group mb-1.5 flex h-9 w-full cursor-pointer items-center justify-between rounded-none px-3.5 transition-colors"
	>
		<div className="flex h-full items-center gap-2.5">
			<img src={icon} alt="" className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
			<span className="text-[12.5px] leading-none font-semibold uppercase text-black">
				{label}
			</span>
		</div>
		<img
			src={arrowIcon}
			alt=""
			className="h-3 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
			aria-hidden="true"
		/>
	</button>
);
