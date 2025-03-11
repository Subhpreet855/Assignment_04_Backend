export interface AuthorizationOptions{
    hasRole: Array<"admin" | "Manager"| "user"| "officer">;
    allowSameUser?: boolean;
}