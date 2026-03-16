import type { Component } from "vue";
import { ViewModel } from "vue-mvvm";
import { RouterService, type RouteAdapter } from "vue-mvvm/router";

import DashboardView from "@view/DashboardView.vue";

export class DashboardViewModel extends ViewModel {
    public static readonly component: Component = DashboardView;
    public static readonly route: RouteAdapter = {
        path: "/"
    }

    private readonly routerService: RouterService;
    
    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
    }
}