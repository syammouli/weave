import { Box, Stack, Typography } from "@mui/material";

const MarketingBadge = () => {
	return (
		<Box className="marketing-badge">
			<Stack direction={"row"} sx={{ gap: "8px", alignItems: "center" }}>
				<Box className="marketing-badge__dot" />
				<Typography className="marketing-badge__text">
					UNIFYING ENTERPRISE AI AGENTS
				</Typography>
			</Stack>
		</Box>
	);
};

export default MarketingBadge;
