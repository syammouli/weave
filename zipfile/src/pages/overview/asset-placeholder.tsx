import { Box, Typography } from "@mui/material";

interface AssetPlaceholderProps {
	/** Human-readable description shown to developers */
	label: string;
	/** The expected file path shown in a code block */
	assetPath: string;
}

/**
 * Shown when an optional media asset hasn't been added yet.
 * Used by SystemArchitectureView and AgentAnalyticsView.
 */
export const AssetPlaceholder = ({
	label,
	assetPath,
}: AssetPlaceholderProps) => (
	<div className="flex h-full min-h-0 items-center justify-center p-6 text-center">
		<Typography sx={{ color: "#6b7280", fontSize: "0.95rem" }}>
			{label}{" "}
			<Box
				component="code"
				sx={{ bgcolor: "#f3f4f6", px: 0.75, py: 0.2, borderRadius: 0.75 }}
			>
				{assetPath}
			</Box>
		</Typography>
	</div>
);
