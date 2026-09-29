import type { LoginCredentials, User } from "@/types";
import { apiClient } from "@/api/client";

export const authApi = {
	login: async (credentials: LoginCredentials) => {
		const { data } = await apiClient.post<{ data: { access_token: string } }>(
			"/azure_usermanagement/login",
			credentials,
		);
		return data;
	},

	getUserInfo: async (): Promise<User> => {
		const { data } = await apiClient.get<User>(
			"/azure_usermanagement/user/info",
		);
		return data;
	},

	getSSOLoginUrl: () => {
		const base =
			import.meta.env.VITE_API_BASE_URL || "http://localhost:8003/api/v1";
		return `${base}/azure_usermanagement/sso/login`;
	},

	logout: async () => {
		await apiClient.post("/azure_usermanagement/sso/logout");
	},
};
