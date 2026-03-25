import { User } from "@supabase/supabase-js";
import { AuthService, ClientService, ContextProvider } from "@tcmn-hub/auth";

import { Database } from "./database.types";

export type StatusModel = Database["app_todo"]["Tables"]["statuses"]["Row"];

export class StatusService {
    private readonly clientService: ClientService;
    private readonly authService: AuthService;

    public constructor(ctx: ContextProvider) {
        this.clientService = ctx.getService(ClientService);
        this.authService = ctx.getService(AuthService);
    }

    public async getStatuses(): Promise<StatusModel[]> {
        const client = this.clientService.getClient<Database>("app_todo");
        
        const {error, data} = await client
            .from("statuses")
            .select();

        if (error) {
            throw error;
        }

        return data;
    }

    public async getStatus(statusId: string): Promise<StatusModel> {
        const client = this.clientService.getClient<Database>("app_todo");

        const {error, data} = await client
            .from("statuses")
            .select()
            .eq("status_id", statusId)
            .limit(1);

        if (error) {
            throw error;
        }

        if (data.length == 0) {
            throw `Could not find status with status_id '${statusId}'`;
        }

        return data[0]!;
    }

    public async createStatus(name: string, description: string, isComplete: boolean): Promise<StatusModel> {
        const client = this.clientService.getClient<Database>("app_todo");
        const user: User = this.authService.getUser();

        const {error, data} = await client
            .from("statuses")
            .insert({
                name,
                description,
                is_complete: isComplete,
                user_id: user.id
            })
            .select();

        if (error) {
            throw error;
        }

        return data[0]!;
    }
}
