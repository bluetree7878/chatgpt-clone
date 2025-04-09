export interface SignUpFormError {
	name?: string[];
	email?: string[];
	password?: string[];
}

export interface LoginFormError {
	email?: string[];
	password?: string[];
}
