import { cn } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/card";

interface StatCardProps {
	icon: React.ReactNode;
	value: React.ReactNode;
	label: string;
	/** Tailwind classes for the icon wrapper (bg + text colour) */
	iconClassName?: string;
}

/**
 * Small metric card with a coloured icon box, a large value, and a label.
 * Used on Access Control and similar dashboard-style pages.
 */
export const StatCard = ({
	icon,
	value,
	label,
	iconClassName,
}: StatCardProps) => (
	<Card>
		<CardBody className="p-5 flex items-center gap-3">
			<div
				className={cn(
					"w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
					iconClassName,
				)}
			>
				{icon}
			</div>
			<div>
				<p className="text-xl font-bold text-gray-900">{value}</p>
				<p className="text-xs text-gray-500">{label}</p>
			</div>
		</CardBody>
	</Card>
);
