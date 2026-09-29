import { Box, Stack } from "@mui/material";
import createAgentIcon from "@/assets/createNewAgent.svg";
import dataBg from "@/assets/dataEngineeringBG.svg";
import enterpriseBg from "@/assets/enterpriseBG.svg";
import industrialBg from "@/assets/industrialBG.svg";
import productivityBg from "@/assets/ProductivityBG.svg";
import marketplaceBanner from "@/assets/module/market-place/bento_light.svg";
import { PageShell } from "@/components/ui/page-shell";
import Partners from "@/pages/dashboard/partners";
import MarketplaceCategory from "./marketplace-category";

type CategoryName =
	| "Enterprise AI"
	| "Industrial AI"
	| "Data Engineering"
	| "Productivity";

export const SUITE_BG: Record<CategoryName, string> = {
	"Enterprise AI": enterpriseBg,
	"Industrial AI": industrialBg,
	"Data Engineering": dataBg,
	"Productivity": productivityBg,
};



export default function DashboardPage() {
	return (
		<PageShell className="flex flex-col gap-30">
			<Stack direction={'column'} sx={{ gap: 5 }}>
				{/* HERO */}
				<div className="text-center w-full flex flex-col gap-3">
					<div className="flex justify-center">
						<div className="flex h-7.5 p-6 py-0 justify-center items-center gap-3.25 bg-[rgba(149,149,149,0.20)] w-fit rounded-[10px] border-[1.5px] border-solid border-white">
							<span className="w-2 h-2 bg-[#BE981C] rounded-full" />
							<span className="text-[11px] font-bold leading-[normal] tracking-[.386px]">
								NEXT - GEN ENTERPRISE AGENTS
							</span>
						</div>
					</div>

					<h1 className="text-2xl font-[AvgarDD] sm:text-[34px] font-semibold leading-normal text-black tracking-wide">
						Weave Agent Marketplace
					</h1>

					{/* Description */}
					<p className="text-[#000000E6] text-center text-[14px] font-normal leading-[180%] [font-feature-settings:'liga'_off,'clig'_off]">
						No-Code AI Agent Platform enabling teams to build, deploy, and
						orchestrate intelligent enterprise workflows.
					</p>

					<button
						type="button"
						className="bg-black text-white px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 mx-auto hover:opacity-90 mt-2.5"
					>
						<img
							src={createAgentIcon}
							alt="Create Agent"
							className="object-contain w-5 h-5"
						/>
						Create New Agent
					</button>
				</div>
				<MarketplaceCategory />
			</Stack>

			<Box
				component="div"
				className="flex flex-col gap-3 items-center w-full"
			>
				<h2 className="text-2xl font-[AvgarDD] sm:text-[34px] font-semibold leading-normal text-black tracking-wide">
					Our Enterprise Frameworks
				</h2>
				<p className="text-[#000000E6] text-center text-[14px] font-normal leading-[180%] [font-feature-settings:'liga'_off,'clig'_off]">
					Built on top of leading enterprise platforms, data systems, and AI frameworks to deliver scalable, production ready agent workflows.
				</p>
				<Partners />
			</Box>

			<div className="text-center flex flex-col gap-3">
				<h2 className="text-2xl font-[AvgarDD] sm:text-[34px] font-semibold leading-normal text-black tracking-wide">
					Weave Agents Capabilities
				</h2>
				<p className="text-[#000000E6] text-center text-[14px] font-normal leading-[180%] [font-feature-settings:'liga'_off,'clig'_off]">
					A thriving Eco System of pre built and custom intelligent agents.
				</p>
				<img
					src={marketplaceBanner}
					alt="Marketplace Banner"
					className="w-[85%] mx-auto mt-4"
				/>
			</div>
		</PageShell>
	);
}