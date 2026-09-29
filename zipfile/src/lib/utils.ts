import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Parses an API error into a human-readable string.
 *
 * Handles:
 *  - FastAPI detail string:  { "detail": "Invalid email or password" }
 *  - FastAPI validation list: { "detail": [{ "loc": [...], "msg": "..." }] }
 *  - Generic message field:  { "message": "..." }
 *  - Plain string body
 *  - Network / unknown errors
 */
export function parseApiError(
	error: unknown,
	fallback = "Something went wrong",
): string {
	if (!axios.isAxiosError(error)) {
		return error instanceof Error ? error.message : fallback;
	}

	const data = error.response?.data;

	if (!data) return error.message || fallback;

	// { "detail": "string" }
	if (typeof data.detail === "string") return data.detail;

	// { "detail": [{ "msg": "..." }, ...] }  — FastAPI validation errors
	if (Array.isArray(data.detail) && data.detail.length > 0) {
		return data.detail
			.map((e: { msg?: string }) => e.msg ?? String(e))
			.join(", ");
	}

	// { "message": "string" }
	if (typeof data.message === "string") return data.message;

	// plain string body
	if (typeof data === "string") return data;

	return fallback;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(date));
}

export function truncate(str: string, length: number) {
	if (str.length <= length) return str;
	return `${str.slice(0, length)}...`;
}
