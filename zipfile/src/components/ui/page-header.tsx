import { cn } from "@/lib/utils";

interface PageHeaderProps {
	title: string;
	description?: string;
	/** CTA button or any node placed on the right */
	action?: React.ReactNode;
	/** Icon rendered inside a branded icon-box on the left */
	icon?: React.ReactNode;
	className?: string;
}

/**
 * Consistent page-level heading used across Projects, Access Control,
 * Settings, and Builder Agent pages.
 *
 * - With `icon` → icon-box + stacked title/description
 * - With `action` → title/description on left, action on right
 * - Plain → just title + description
 */
export const PageHeader = ({
	title,
	description,
	action,
	icon,
	className,
}: PageHeaderProps) => {
	if (icon) {
		return (
			<div className={cn("flex items-center gap-3 mb-8", className)}>
				<div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0">
					{icon}
				</div>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
					{description && (
						<p className="text-gray-500 text-sm">{description}</p>
					)}
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"mb-8",
				action &&
					"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				className,
			)}
		>
			<div>
				<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
				{description && (
					<p className="text-gray-500 mt-1">{description}</p>
				)}
			</div>
			{action}
		</div>
	);
};
