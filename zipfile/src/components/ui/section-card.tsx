import { cn } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/card";

interface SectionCardProps {
	title: string;
	children: React.ReactNode;
	/** Extra Tailwind classes forwarded to CardBody */
	bodyClassName?: string;
}

/**
 * A Card with a standard section heading.
 * Replaces the repeated `<Card><CardBody><h2>...</h2>{children}</CardBody></Card>` pattern
 * in Builder Agent and Settings pages.
 */
export const SectionCard = ({
	title,
	children,
	bodyClassName,
}: SectionCardProps) => (
	<Card>
		<CardBody className={cn("p-6", bodyClassName)}>
			<h2 className="text-base font-semibold text-gray-900 mb-4">{title}</h2>
			{children}
		</CardBody>
	</Card>
);
