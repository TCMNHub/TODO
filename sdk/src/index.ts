import {auth} from "@tcmn-hub/auth";

import {ProjectService} from "./project";
import {TodoService} from "./todo";

export * from "./project";
export * from "./todo";

export namespace todo {
    export function register(ctx: auth.ContextRegistration): void {
        ctx.registerService(ProjectService, ctx => new ProjectService(ctx));
        ctx.registerService(TodoService, ctx => new TodoService(ctx));
    }
}