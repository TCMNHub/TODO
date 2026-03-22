import type {AppShell, WritableGlobalContext} from "vue-mvvm";

import {auth} from "@tcmn-hub/auth";
import {todo} from "@tcmn-hub/todo";

import {DashboardViewModel} from "@view/DashboardView.model";
import {TodosViewModel} from "@view/TodosView.model";
import {ProjectViewModel} from "@view/ProjectView.model";

import {SecurityService} from "@service/security.service";

export class AppConfig implements AppShell {
    private readonly supabaseUrl: string;
    private readonly supabaseAnonKey: string;
    private readonly supabaseCookiePrefix: string;
    private readonly loginUrl: string;

    private ctx: WritableGlobalContext | null;

    public router: AppShell.RouterConfig = {
        views: [
            DashboardViewModel,
            TodosViewModel,
            ProjectViewModel
        ]
    }

    public constructor(supabaseUrl: string, supabaseAnonKey: string, supabaseCookiePrefix: string, loginUrl: string) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseAnonKey = supabaseAnonKey;
        this.supabaseCookiePrefix = supabaseCookiePrefix;
        this.loginUrl = loginUrl;

        this.ctx = null;
    }

    public configureServices(ctx: WritableGlobalContext): void {
        this.ctx = ctx;

        auth.register(ctx, this.supabaseUrl, this.supabaseAnonKey, this.supabaseCookiePrefix);
        todo.register(ctx);

        ctx.registerService(SecurityService, ctx => new SecurityService(ctx, this.loginUrl))
    }

    public async trySSO(): Promise<void> {
        if (!this.ctx) {
            return;
        }

        const securityService: SecurityService = this.ctx.getService(SecurityService);
        await securityService.tryLogin();
    }
}