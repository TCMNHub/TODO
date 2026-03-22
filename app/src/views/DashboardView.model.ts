import type {Component} from "vue";
import {type ActionResult, ViewModel} from "vue-mvvm";
import {RouterService, type RouteAdapter} from "vue-mvvm/router";
import {DialogService} from "vue-mvvm/dialog";

import type {ProjectModel} from "@tcmn-hub/todo";

import DashboardView from "@view/DashboardView.vue";

import {ProjectDialogModel} from "@control/ProjectDialog.model";
import {ProjectViewModel} from "@view/ProjectView.model";

export class DashboardViewModel extends ViewModel {
    public static readonly component: Component = DashboardView;
    public static readonly route: RouteAdapter = {
        path: "/"
    }

    private readonly routerService: RouterService;
    private readonly dialogService: DialogService;

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.dialogService = this.ctx.getService(DialogService);
    }


    public async onNewProjectBtn(): Promise<void> {
        using dialog: ProjectDialogModel = this.dialogService.initDialog(ProjectDialogModel, null);

        await dialog.openDialog();
        const result: ActionResult<ProjectModel> = await this.runAction(dialog);
        if (!result.success) {
            console.error(result.error);
            return;
        }

        await this.routerService.navigateTo(ProjectViewModel, {
            id: result.data.project_id
        });
    }

}