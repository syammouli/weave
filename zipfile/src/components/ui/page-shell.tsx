import { Box } from "@mui/material";
import Intersect from "@/assets/module/market-place/Intersect.svg";

interface PageShellProps {
	children: React.ReactNode;
	className?: string;
}

export const PageShell = ({ children, className }: PageShellProps) => (
	<Box
		component="div"
		className={`px-6 py-12 relative${className ? ` ${className}` : ""}`}
	>
		<Box
			component="img"
			src={Intersect}
			aria-hidden="true"
			sx={{ position: "absolute", top: 0, right: "50%", pointerEvents: "none" }}
		/>
		{children}
	</Box>
);
