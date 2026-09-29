		export interface User {
	email: string;
	first_name: string;
	last_name: string;
	username: string;
	role: "users" | "admin";
}

export interface AuthState {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
}

export interface Agent {
	id: string;
	heading: string;
	subHeading: string;
	tags: string[];
	status: "active" | "inactive" | "coming_soon";
	suite: "ASuite" | "DSuite" | "ESuite" | "PSuite";
	path?: string;
	icon?: string;
}

export interface AgentSuite {
	id: string;
	key: "ASuite" | "DSuite" | "ESuite" | "PSuite";
	name: string;
	description: string;
	agentCount: number;
	color: string;
	gradient: string;
}

export interface Workflow {
	id: string;
	name: string;
	description?: string;
	created_at: string;
	updated_at: string;
	status: "active" | "draft" | "archived";
	agent_name?: string;
}

export interface LoginCredentials {
	username: string
	email: string;
	password: string;
}

export interface ApiResponse<T> {
	data: T;
	message: string;
	success: boolean;
}
