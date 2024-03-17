import { AppState } from "@/lib/store";

export const selectUsers = (state: AppState) => state.users.users;
