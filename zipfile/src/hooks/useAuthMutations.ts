import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import type { LoginCredentials, User } from "@/types";

interface AuthResult {
	token: string;
	user: User;
}

/** Email + password login — POST /login → GET /user/info */
export const useLoginMutation = () => {
	const navigate = useNavigate();
	const { setToken, setAuth } = useAuthStore();

	return useMutation<AuthResult, Error, LoginCredentials>({
		mutationFn: async (credentials) => {
			const { data } = await authApi.login(credentials);
			// Put token in store so the getUserInfo call gets the Authorization header
			setToken(data.access_token);
			const user = await authApi.getUserInfo();
			return { token: data?.access_token, user };
		},
		onSuccess: ({ token, user }) => {
			setAuth(token, user);
			navigate("/dashboard", { replace: true });
		},
	});
};

/** SSO callback — token arrives in URL; fetch user info with it */
export const useSSOLoginMutation = () => {
	const navigate = useNavigate();
	const { setToken, setAuth } = useAuthStore();

	return useMutation<AuthResult, Error, string>({
		mutationFn: async (token) => {
			setToken(token);
			const user = await authApi.getUserInfo();
			return { token, user };
		},
		onSuccess: ({ token, user }) => {
			setAuth(token, user);
			navigate("/dashboard", { replace: true });
		},
	});
};

/** Logout — clears local state; optionally hits the server */
export const useLogoutMutation = () => {
	const navigate = useNavigate();
	const { clearAuth } = useAuthStore();

	return useMutation<void, Error, void>({
		mutationFn: () => authApi.logout(),
		onSettled: () => {
			clearAuth();
			navigate("/", { replace: true });
		},
	});
};
