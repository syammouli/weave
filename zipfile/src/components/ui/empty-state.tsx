interface EmptyStateProps {
	/** Icon rendered inside a grey rounded square */
	icon?: React.ReactNode;
	title: string;
	description: string;
	action?: React.ReactNode;
}

/**
 * Centred empty / error placeholder used inside content areas.
 */
export const EmptyState = ({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) => (
	<div className="flex flex-col items-center justify-center py-20 text-center">
		{icon && (
			<div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
				{icon}
			</div>
		)}
		<h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
		<p className="text-sm text-gray-500 max-w-xs mb-6">{description}</p>
		{action}
	</div>
);
