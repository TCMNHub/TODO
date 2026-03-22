import {getCurrentInstance} from "vue";
import {type ActionResult, UserControl} from "vue-mvvm";
import {RouterService} from "vue-mvvm/router";
import {DialogService} from "vue-mvvm/dialog";

import {type ProjectModel, ProjectService} from "@tcmn-hub/todo";

import {ProjectViewModel} from "@view/ProjectView.model";
import {DashboardViewModel} from "@view/DashboardView.model";
import {TodosViewModel} from "@view/TodosView.model";

import {ProjectDialogModel} from "@control/ProjectDialog.model";

import {SecurityService} from "@service/security.service";

export class AppShellModel extends UserControl {
    private readonly routerService: RouterService;
    private readonly dialogService: DialogService;

    private readonly securityService: SecurityService;
    private readonly projectService: ProjectService;


    private readonly uid: number = this.computed(() => {
        const instance = getCurrentInstance();
        if (!instance) {
            return Math.round(Math.random() * 1000);
        }

        return instance.uid;
    });

    public projects: ProjectModel[] = this.ref([]);

    public readonly dropdownName: string = this.computed(() => `dropdown-${this.uid}`);

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.dialogService = this.ctx.getService(DialogService);

        this.securityService = this.ctx.getService(SecurityService);
        this.projectService = this.ctx.getService(ProjectService);
    }

    protected async mounted(): Promise<void> {
        this.projects = await this.projectService.getProjects();
    }

    public async onDashboardBtn(): Promise<void> {
        await this.routerService.navigateTo(DashboardViewModel);
    }

    public async onTodosBtn(): Promise<void> {
        await this.routerService.navigateTo(TodosViewModel);
    }

    public async onNewProjectBtn(): Promise<void> {
        using dialog: ProjectDialogModel = this.dialogService.initDialog(ProjectDialogModel, null);

        await dialog.openDialog();
        const result: ActionResult<ProjectModel> = await this.runAction(dialog);
        if (!result.success) {
            console.error(result.error);
            return;
        }

        this.projects.push(result.data);
        await this.routerService.navigateTo(ProjectViewModel, {
            id: result.data.project_id
        });
    }

    public async onProjectItemBtn(project: ProjectModel): Promise<void> {
        await this.routerService.navigateTo(ProjectViewModel, {
            id: project.project_id
        });
    }

    public onProfileBtn(): void {
        this.securityService.redirectToLoginProfile();
    }

    public async onSignOutBtn(): Promise<void> {
        await this.securityService.signOut();
    }
}