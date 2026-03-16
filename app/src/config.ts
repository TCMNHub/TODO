import { DashboardViewModel } from "@view/DashboardView.model";
import type { AppShell, WritableGlobalContext } from "vue-mvvm";

export class AppConfig implements AppShell {
    router: AppShell.RouterConfig = {
        views: [
            DashboardViewModel
        ]
    }

    public configureServices(ctx: WritableGlobalContext): void {
        
    }
}