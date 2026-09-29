import type { Palette } from "@mui/material";

export const rootStyles = ({ palette }: { palette: Palette }) => {
	return {
		background: palette.custom.login.loginBg,
		height: "100vh",
		p: 1,
	};
};

export const marketingContainerStyles = () => {
	return {
		position: 'relative',
		overflow: 'hidden',
		background: '#070708',
		padding: '52px',
		borderRadius: "20px",
		height: 'auto',
		flex: "0 0 45%",
		minHeight: "stretch",
		justifyContent: "center",
	};
};


export const layerStyles = {
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: '0',
	width: "100%",
	height: "100%",
	objectFit: "cover",
}

export const contentContainerStyles = {
	display: "none",
	"@media (min-width: 800px)": {
		display: "flex",
	},
	zIndex: '999',
	gap: 4
}