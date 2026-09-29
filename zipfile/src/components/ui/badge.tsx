import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import { cn } from "@/lib/utils";

interface BadgeProps {
	variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
	size?: "sm" | "md";
	className?: string;
	children?: React.ReactNode;
}

const variantToColor: Record<
	NonNullable<BadgeProps["variant"]>,
	ChipProps["color"]
> = {
	default: "default",
	success: "success",
	warning: "warning",
	danger: "error",
	info: "info",
	outline: "default",
};

export const Badge = ({
	variant = "default",
	size = "sm",
	className,
	children,
}: BadgeProps) => (
	<Chip
		label={children}
		color={variantToColor[variant]}
		size="small"
		variant={variant === "outline" ? "outlined" : "filled"}
		className={cn(className)}
		sx={{
			height: size === "sm" ? 20 : 24,
			fontSize: size === "sm" ? "0.7rem" : "0.8rem",
			fontWeight: 500,
			borderRadius: "999px",
		}}
	/>
);
