import type {ReadableGlobalContext} from "vue-mvvm";
import {AuthService, AppService, type UsersToAppModel} from "@tcmn-hub/auth";
import { StatusService } from "@tcmn-hub/todo";

export class SecurityService {
    private readonly authService: AuthService;
    private readonly appService: AppService;
    private readonly statusService: StatusService;

    private readonly loginUrl: string;

    public constructor(ctx: ReadableGlobalContext, loginUrl: string) {
        this.authService = ctx.getService(AuthService);
        this.appService = ctx.getService(AppService);
        this.statusService = ctx.getService(StatusService);

        this.loginUrl = loginUrl;
    }

    public async signOut(): Promise<void> {
        await this.authService.signOut();
        this.redirectToLogin();
    }

    public async tryLogin(): Promise<void> {
        try {
            await this.authService.loginWithCookies();
            const connectedApps: UsersToAppModel[] = await this.appService.getConnectedApps();
            if (!connectedApps.some(app => app.apps.identifier == "app.tcmn.todo")) {
                await this.appService.connectApp("app.tcmn.todo");
                await Promise.all([
                    this.statusService.createStatus("Planned", "Task has been identified and scheduled, but no action has been taken yet. It may still need preparation, prioritization, or additional details before work can begin.", false),
                    this.statusService.createStatus("Ready", "Task is fully defined and prepared. All requirements, resources, and dependencies are in place, so it can be started at any time.", false),
                    this.statusService.createStatus("In Progress", "Work on the task has started and is actively being carried out. The task is currently being worked on but is not yet finished.", false),
                    this.statusService.createStatus("Completed", "All work on the task has been finished successfully. The task meets its requirements and no further action is needed.", true)
                ]);
            }
        } catch {
            this.redirectToLogin();
        }
    }

    public async isAdmin(): Promise<boolean> {
        const userToApp: UsersToAppModel = await this.appService.getConnectedApp("app.tcmn.todo");
        return userToApp.roles.identifier == "admin";
    }

    public redirectToLoginProfile(): void {
        window.location.href = this.loginUrl;
    }

    private redirectToLogin(): void {
        window.location.href = this.authService.buildAuthURL(this.loginUrl, window.location.href);
    }
}