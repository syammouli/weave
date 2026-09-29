import { Box, Typography } from "@mui/material";
import { titleTextStyle } from "./style";

const MarketingTitleBar = () => {
	return (
		<Box >
			<Typography sx={titleTextStyle} variant="h4" >
				Specialized AI Platforms <br /> Integrated with{" "}
				<Typography component={"span"} className="marketing-title__weave-text">
					Weave
				</Typography>
			</Typography>
		</Box>
	);
};

export default MarketingTitleBar;
