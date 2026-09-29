import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";

interface ImageWithFallbackProps {
	src: string;
	alt: string;
	fallback: React.ReactNode;
	sx?: SxProps<Theme>;
	onError?: () => void;
}

/**
 * Renders a MUI Box img with a React fallback node shown when the image fails to load.
 */
export const ImageWithFallback = ({
	src,
	alt,
	fallback,
	sx,
	onError,
}: ImageWithFallbackProps) => {
	const [failed, setFailed] = useState(false);

	if (failed) return <>{fallback}</>;

	return (
		<Box
			component="img"
			src={src}
			alt={alt}
			onError={() => {
				setFailed(true);
				onError?.();
			}}
			sx={sx}
		/>
	);
};
