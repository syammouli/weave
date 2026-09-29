import type { Palette } from "@mui/material";

export const titleTextStyle = ({ palette }: { palette: Palette }) => {
	return {
		color: palette.common.white,
		fontSize: "clamp(32px, 2.5vw, 56px)",
		lineHeight: "clamp(42px, 3.2vw, 72px)",
		fontWeight: 500,
		letterSpacing: "0.18px",
		fontFamily: "'Lufga', sans-serif"
	};
};
