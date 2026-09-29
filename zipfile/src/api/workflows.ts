import type { Workflow } from "@/types";
import { canvasClient } from "@/api/client";

export const workflowsApi = {
	getAll: async (): Promise<Workflow[]> => {
		const { data } = await canvasClient.get<Workflow[]>("/workflows");
		return data;
	},

	getById: async (id: string): Promise<Workflow> => {
		const { data } = await canvasClient.get<Workflow>(`/workflows/${id}`);
		return data;
	},

	create: async (payload: Partial<Workflow>): Promise<Workflow> => {
		const { data } = await canvasClient.post<Workflow>("/workflows", payload);
		return data;
	},

	update: async (id: string, payload: Partial<Workflow>): Promise<Workflow> => {
		const { data } = await canvasClient.put<Workflow>(
			`/workflows/${id}`,
			payload,
		);
		return data;
	},

	delete: async (id: string): Promise<void> => {
		await canvasClient.delete(`/workflows/${id}`);
	},
};

export const QUERY_KEYS = {
	workflows: ["workflows"] as const,
	workflow: (id: string) => ["workflows", id] as const,
	subAgents: ["sub-agents"] as const,
};
