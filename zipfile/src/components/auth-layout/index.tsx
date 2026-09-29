import { Box, Grid, Stack } from "@mui/material";
import bottomShape from "@/assets/module/login/Bottom_shape.png";
import grid from "@/assets/module/login/grid.png";
import topShape from "@/assets/module/login/Top_shape.png";
import FormContainer from "./components/form-container";
import MarketingBadge from "./components/marketing-badge";
import MarketingTitleBar from "./components/markting-title-bar";
import MarketingCard from "./components/marketing-card";

import SelectAnAgent from "@/assets/module/login/first_card.webp";
import ConfigureAgent from "@/assets/module/login/second_card.webp";
import MonitorImprovement from "@/assets/module/login/third_card.webp";
import DeployWorkflow from "@/assets/module/login/fourth_card.webp";
import gradient from "@/assets/module/login/gradient.svg";
import pattern from "@/assets/module/login/pattern.svg";
import { contentContainerStyles, layerStyles, marketingContainerStyles } from "./styles";

const marketingPoints = [
	{
		key: "select_an_agent",
		label: "Select an AI Agent",
		title: "Select an AI Agent",
		description:
			"Browse over a curated selection of AI agents from the marketplace to automate and manage your workflows.",
		src: SelectAnAgent,
	},
	{
		key: "configure_agent",
		label: "Configure the Agent",
		title: "Configure the Agent",
		description:
			"Tailor each agent's inputs, configurations, and behaviours to meet your business needs.",
		src: ConfigureAgent,
	},
	{
		key: "monitor_improvement",
		label: "Monitor & Improve",
		title: "Monitor & Improve",
		description:
			"Continuously review and improve your process performance and optimize your system outcomes.",
		src: MonitorImprovement,
	},
	{
		key: "deploy_workflow",
		label: "Deploy to Workflow",
		title: "Deploy to Workflow",
		description:
			"Set up your agents, define workflows, and orchestrate your systems with precision.",
		src: DeployWorkflow,
	},
];

interface AuthLayoutProps {
    children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

	return (
		<Box className="login-page" sx={{ backgroundImage: `url(${grid})`, p: 2 }}>
			<Box
				src={topShape}
				className="login-shape login-shape--top"
				sx={{ display: { xs: "none", lg: "block" } }}
				component={"img"}
			/>
			<Box
				src={bottomShape}
				className="login-shape login-shape--bottom"
				sx={{ display: { xs: "none", lg: "block" } }}
				component={"img"}
			/>
			<FormContainer formContainer={children} />
			<Stack sx={marketingContainerStyles}>
				{[gradient, pattern,].map((layer, index) => {
					return (
						<Box
							src={layer}
							sx={layerStyles}
							component={"img"}
							key={index.toString()}
						/>
					)
				})}
				<Stack
					sx={contentContainerStyles}
				>
					<MarketingBadge />
					<MarketingTitleBar />
					<Grid
						container
						columnSpacing={"24px"}
						rowSpacing={"20px"}
						sx={{ alignItems: "stretch" }}
					>
						{marketingPoints.map((item) => {
							return (
								<Grid key={item.key} size={6}>
									<MarketingCard item={item} key={item.key} />
								</Grid>
							);
						})}
					</Grid>
				</Stack>
			</Stack>
		</Box>
	);
};

export default AuthLayout;
