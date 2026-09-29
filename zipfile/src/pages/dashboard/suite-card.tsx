import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import agentNumber from "@/assets/agentNumber.svg";

export interface SuiteCardItem {
	category_id: number;
	category_name: string;
	description: string;
	agent_count: number;
	/** Resolved asset URL — imported by the parent and passed down */
	icon: string;
	meta?: {
		bg: string
	}
}

export const SuiteCard = ({ item }: { item: SuiteCardItem }) => (
	<Link to={`/agents/${encodeURIComponent(item.category_name)}`}>
		<Card
			className="suite-cards group"
			variant="outlined"
			sx={{
				background: "rgba(255, 255, 255, 0.34) !important",
				border: "1.5px solid #FFF !important",
			}}
		>
			<div className={`inner-card bg-${item.category_name.toLowerCase()}`}>
				<div className="dotted-bg" />
				<div className="card-content">
					<div className="card-header">
						<div className="flex items-center justify-center w-10 h-10 rounded-lg border-[0.8px] border-[#E4E4E4] bg-[rgba(238,238,238,0.70)] transition-all duration-200 group-hover:border-[#E6D48A] group-hover:bg-[#F6EDC9]">
							<img
								alt={item.category_name}
								src={item.icon}
								className="w-5 h-5 object-contain"
							/>
						</div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f3f4f6] border border-transparent text-xs font-semibold text-[#374151] whitespace-nowrap transition-all duration-200 group-hover:border-[#E6CE70] group-hover:bg-[linear-gradient(270deg,#DBC363_-4.62%,#E6D48A_98.24%)]">
							<img src={agentNumber} alt="" className="w-3.5 h-3.5" />
							<span>{item.agent_count} AGENTS</span>
						</div>
					</div>
					<div className="card-body">
						<h3 className="card-title">{item.category_name}</h3>
						<p className="card-description">{item.description}</p>
					</div>
				</div>
			</div>
		</Card>
	</Link>
);
