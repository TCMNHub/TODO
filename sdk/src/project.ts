import {User} from "@supabase/supabase-js";

import {AuthService, ClientService, type ContextProvider} from "@tcmn-hub/auth";

import {Database} from "./database.types";

export type ProjectModel = Database["app_todo"]["Tables"]["projects"]["Row"];

export class ProjectService {
    private clientService: ClientService;
    private authService: AuthService;

    public constructor(ctx: ContextProvider) {
        this.clientService = ctx.getService(ClientService);
        this.authService = ctx.getService(AuthService);
    }

    public async getProjects(): Promise<ProjectModel[]> {
        const client = this.clientService.getClient<Database>("app_todo");
        const {data, error} = await client
            .from("projects")
            .select();

        if (error) {
            throw error;
        }

        return data;
    }

    public async getProject(projectId: string): Promise<ProjectModel> {
        const client = this.clientService.getClient<Database>("app_todo");
        const {data, error} = await client
            .from("projects")
            .select()
            .eq("project_id", projectId)
            .limit(1)

        if (error) {
            throw error;
        }

        if (data.length == 0) {
            throw `Could not find project with project_id '${projectId}'`;
        }

        return data[0]!;
    }

    public async createProject(name: string, description: string | null): Promise<ProjectModel> {
        const client = this.clientService.getClient<Database>("app_todo");
        const user: User = this.authService.getUser();

        if (description == "") {
            description = null;
        }

        const {data, error} = await client
            .from("projects")
            .insert({
                user_id: user.id,
                name,
                description
            })
            .select();

        if (error) {
            throw error;
        }

        return data[0]!;
    }

    public async updateProject(projectId: string, name: string, description: string | null): Promise<void> {
        const client = this.clientService.getClient<Database>("app_todo");
        if (description == "") {
            description = null;
        }

        const {error} = await client
            .from("projects")
            .update({
                name,
                description
            })
            .eq("project_id", projectId);

        if (error) {
            throw error;
        }
    }
}