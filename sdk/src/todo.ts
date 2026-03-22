import {User} from "@supabase/supabase-js";

import {AuthService, ClientService, type ContextProvider} from "@tcmn-hub/auth";

import {Database} from "./database.types";
import {todo} from "./index";

export type TodoModel = Database["app_todo"]["Tables"]["todos"]["Row"];

export class TodoService {
    private readonly clientService: ClientService;
    private readonly authService: AuthService;

    public constructor(ctx: ContextProvider) {
        this.clientService = ctx.getService(ClientService);
        this.authService = ctx.getService(AuthService);
    }

    public async getTodos(): Promise<TodoModel[]> {
        const client = this.clientService.getClient<Database>("app_todo");

        const {error, data} = await client
            .from("todos")
            .select();

        if (error) {
            throw error;
        }

        return data;
    }

    public async getTodo(todoId: string): Promise<TodoModel> {
        const client = this.clientService.getClient<Database>("app_todo");

        const {error, data} = await client
            .from("todos")
            .select()
            .eq("todos.todo_id", todoId);

        if (error) {
            throw error;
        }
        if (data.length == 0) {
            throw `Could not find todo with todo_id '${todoId}'`;
        }

        return data[0]!;
    }

    public async getTodosOfProject(projectId: string): Promise<TodoModel[]> {
        const client = this.clientService.getClient<Database>("app_todo");

        const {error, data} = await client
            .from("todos")
            .select()
            .eq("todos.project_id", projectId);

        if (error) {
            throw error;
        }

        return data;
    }
}