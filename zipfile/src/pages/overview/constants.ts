/**
 * Overview tabs aligned to node 1267:12919.
 */
export const OVERVIEW_TABS = [
	"available-agents",
	"business-wins",
	"integrated-tools",
	"agent-architecture",
	"agent-in-action",
] as const;

export type OverviewTabId = (typeof OVERVIEW_TABS)[number];

export const ASSETS = {
	/** Figma: hero / agent avatar layer — drop file at public/images/overview/ */
	heroAgentIcon: "/images/overview/figma-weave-agent-hero-icon.png",
	/** Figma: right-rail illustration (workers + monitor) */
	visionIllustration:
		"/images/overview/figma-vision-monitoring-illustration.png",
	/** Figma: architecture diagram export */
	architectureDiagram: "/images/overview/figma-system-architecture-diagram.svg",
	/** Figma: analytics chart / sparkline asset */
	analyticsChart: "/images/overview/figma-agent-analytics-chart.png",
	icons: {
		halconTool: "/images/overview/icons/figma-layer-halcon-sdk.svg",
		cameraPipeline: "/images/overview/icons/figma-layer-edge-camera.svg",
		dashboard: "/images/overview/icons/figma-layer-dashboard-widget.svg",
	},
} as const;
