import type {Component} from "vue";
import {type ActionResult, ViewModel} from "vue-mvvm";
import {type RouteAdapter, RouterService} from "vue-mvvm/router";
import {DialogService} from "vue-mvvm/dialog";

import {type ProjectModel, ProjectService, type TodoModel} from "@tcmn-hub/todo";

import ProjectView from "@view/ProjectView.vue";
import {ProjectDialogModel} from "@control/ProjectDialog.model";
import { TodoDialogModel } from "@control/TodoDialog.model";

export class ProjectViewModel extends ViewModel {
    public static readonly component: Component = ProjectView;
    public static readonly route = {
        path: "/project/:id",
        params: {
            id: "string"
        }
    } satisfies RouteAdapter;

    private readonly routerService: RouterService;
    private readonly dialogService: DialogService;

    private readonly projectService: ProjectService;

    public project: ProjectModel | null = this.ref(null);

    public readonly name: string = this.computed(() => this.project?.name ?? "");
    public readonly creationDate: string = this.computed(() => {
        if (!this.project) {
            return "";
        }

        return new Date(this.project.created_at).toLocaleDateString();
    });

    public constructor() {
        super();

        this.routerService = this.ctx.getService(RouterService);
        this.dialogService = this.ctx.getService(DialogService);

        this.projectService = this.ctx.getService(ProjectService);
    }

    protected async mounted(): Promise<void> {
        const projectId: string = this.routerService.params.getStringOrThrow("id");
        this.project = await this.projectService.getProject(projectId);
    }

    public async onProjectEditBtn(): Promise<void> {
        if (!this.project) {
            return;
        }
        using dialog: ProjectDialogModel = this.dialogService.initDialog(ProjectDialogModel, this.project);

        await dialog.openDialog();
        const result: ActionResult<ProjectModel> = await this.runAction(dialog);
        if (!result.success) {
            console.error(result.error);
            return;
        }
    }

    public async onNewTaskBtn(): Promise<void> {
        if (!this.project) {
            return;
        }
        
        using dialog = this.dialogService.initDialog(TodoDialogModel, this.project, null);

        await dialog.openDialog();
        const result: ActionResult<TodoModel> = await this.runAction(dialog);
        if (!result.success) {
            console.error(result.error);
            return;
        }
    }

    public async onSeeAllBtn(): Promise<void> {

    }
}