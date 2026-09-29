import MuiAvatar from "@mui/material/Avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
	name?: string;
	src?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizes = {
	sm: 28,
	md: 36,
	lg: 44,
};

const fontSizes = {
	sm: 11,
	md: 13,
	lg: 15,
};

const COLORS = [
	"#f97316", // orange-500
	"#3b82f6", // blue-500
	"#22c55e", // green-500
	"#a855f7", // purple-500
	"#ec4899", // pink-500
];

function getColor(name: string) {
	return COLORS[name.charCodeAt(0) % COLORS.length];
}

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

export const Avatar = ({
	name = "",
	src,
	size = "md",
	className,
}: AvatarProps) => {
	const px = sizes[size];
	return (
		<MuiAvatar
			src={src}
			alt={name}
			className={cn("shrink-0", className)}
			sx={{
				width: px,
				height: px,
				fontSize: fontSizes[size],
				fontWeight: 600,
				bgcolor: src ? undefined : getColor(name),
			}}
		>
			{!src && getInitials(name)}
		</MuiAvatar>
	);
};
