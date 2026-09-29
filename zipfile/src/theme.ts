import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		custom: {
			login: {
				marketingBg: string;
				loginBg: string;
			};
		};
	}
	interface PaletteOptions {
		custom?: {
			login: {
				marketingBg: string;
				loginBg: string;
			};
		};
	}
}

export const theme = createTheme({
	palette: {
		primary: {
			main: "#34300B",
			dark: "#000",
			light: "#fdba74",
			contrastText: "#ffffff",
		},
		error: {
			main: "#ef4444",
		},
		background: {
			default: "#f8f8fb",
		},
		custom: {
			login: {
				marketingBg: "#070708",
				loginBg: "#FCFCFC",
			},
		},
	},
	typography: {
		// fontFamily: "'Lufga', sans-serif",
		fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 500,
				},
			},
			variants: [
				{
					props: { variant: "contained", color: "primary" },
					style: {
						background: "linear-gradient(182deg, #34300B -46.46%, #000 98.39%)",
						color: "#fff",
						"&:hover": {
							background:
								"linear-gradient(182deg, #4a4210 -46.46%, #1a1a1a 98.39%)",
						},
						"& .MuiButton-loadingIndicator": {
							color: "#ffffff",
						},
						"&.Mui-disabled": {
							background: "linear-gradient(180deg, #3a3a3a 46.46%, #1a1a1a 98.39%)",
							color: "rgba(255,255,255,0.35)",
							cursor: "not-allowed",
							pointerEvents: "auto",
						},
					},
				},
				{
					props: { variant: "contained", color: "secondary" },
					style: {
						display: "inline-flex",
						border: "0.8px solid #E4E4E4",
						background: "#EEE",
						color: "#1A1A1A",
						"&:hover": {
							background: "#E0E0E0",
							borderColor: "#D0D0D0",
						},
					},
				},
				{
					props: { variant: "outlined", color: "secondary" },
					style: {
						background: "#F5F5F5",
						border: "1px solid #000",
						color: "#1A1A1A",
						fontWeight: 600,
						"&:hover": {
							background: "#EBEBEB",
							borderColor: "#B0B0B0",
						},
					},
				},
			],
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					color: "#6D5306",
					fontFeatureSettings: `'liga' off, 'clig' off`,
					fontFamily: "Poppins, sans-serif",
					fontSize: "13px",
					fontStyle: "normal",
					fontWeight: 600,
					lineHeight: "110%",
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				"*": { boxSizing: "border-box" },
				"html, body": { height: "100%", margin: 0, padding: 0 },
				"#root": { height: "100%", width: "100%" },
			},
		},
	},
});
