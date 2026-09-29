import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	setToken: (token: string) => void;
	setAuth: (token: string, user: User) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			setToken: (token) => set({ token }),
			setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
			clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
		}),
		{
			name: "weave-auth",
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
