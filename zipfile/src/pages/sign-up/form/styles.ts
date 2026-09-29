import type { Palette } from "@mui/material";

export const formContainerInnerStyles = () => {
	return {
		px: { xs: 3, sm: 0 },
		width: "100%",
		maxWidth: {
			xs: "100%",
			sm: "360px",
			md: "400px",
			lg: "420px",
		},
		"@media (min-width: 1100px)": {
			maxWidth: "500px",
		},
		"@media (min-width: 1400px)": {
			maxWidth: "600px",
		},
		"@media (min-width: 1600px)": {
			maxWidth: "680px",
		},
	};	
};

export const brandLogoStyle = () => {
	return {
		height: "45.69px",
		width: "49.254px",
	};
};

export const titleStyle = ({ palette }: { palette: Palette }) => {
	return {
		color: palette.common.black,
		mt: "20px",
	};
};
