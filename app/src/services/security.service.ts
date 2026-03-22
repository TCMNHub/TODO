import type {ReadableGlobalContext} from "vue-mvvm";
import {AuthService, AppService, type UsersToAppModel} from "@tcmn-hub/auth";

export class SecurityService {
    private readonly authService: AuthService;
    private readonly appService: AppService;

    private readonly loginUrl: string;

    public constructor(ctx: ReadableGlobalContext, loginUrl: string) {
        this.authService = ctx.getService(AuthService);
        this.appService = ctx.getService(AppService);

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