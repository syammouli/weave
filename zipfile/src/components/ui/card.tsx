import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, hoverable, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"bg-white rounded-xl border border-gray-100 shadow-[0_0.25rem_1.5rem_0_rgba(0,0,0,0.06)]",
				hoverable &&
					"hover:shadow-[0_0.5rem_2rem_0_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
				className,
			)}
			{...props}
		/>
	),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6", className)} {...props} />
));
CardBody.displayName = "CardBody";

export const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("px-6 py-4 border-t border-gray-100", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";
