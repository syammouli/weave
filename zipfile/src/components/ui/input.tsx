import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	hint?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, label, error, hint, startIcon, endIcon, id, ...props },
		ref,
	) => {
		const generatedId = React.useId();
		const inputId = id ?? generatedId;
		const errorId = `${inputId}-error`;
		const hintId = `${inputId}-hint`;

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label
						htmlFor={inputId}
						className="text-sm font-medium text-gray-700"
					>
						{label}
					</label>
				)}
				<div className="relative flex items-center">
					{startIcon && (
						<span className="absolute left-3 text-gray-400 pointer-events-none">
							{startIcon}
						</span>
					)}
					<input
						ref={ref}
						id={inputId}
						aria-describedby={
							[error && errorId, hint && hintId].filter(Boolean).join(" ") ||
							undefined
						}
						aria-invalid={!!error}
						className={cn(
							"w-full h-10 rounded-lg border bg-white px-3 text-sm text-gray-900",
							"placeholder:text-gray-400",
							"border-gray-200 hover:border-gray-300",
							"focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
							"disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
							"transition-colors",
							error &&
								"border-red-400 focus:ring-red-500/20 focus:border-red-500",
							startIcon && "pl-9",
							endIcon && "pr-9",
							className,
						)}
						{...props}
					/>
					{endIcon && (
						<span className="absolute right-3 text-gray-400">{endIcon}</span>
					)}
				</div>
				{error && (
					<p id={errorId} role="alert" className="text-sm text-red-500">
						{error}
					</p>
				)}
				{hint && !error && (
					<p id={hintId} className="text-sm text-gray-500">
						{hint}
					</p>
				)}
			</div>
		);
	},
);
Input.displayName = "Input";
