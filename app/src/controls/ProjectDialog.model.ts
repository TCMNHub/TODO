import type {Component} from "vue";
import {DialogControl} from "vue-mvvm/dialog";

import {type ProjectModel, ProjectService} from "@tcmn-hub/todo";

import ProjectDialog from "@control/ProjectDialog.vue";
import {type Action, ActionContext} from "vue-mvvm";

export class ProjectDialogModel extends DialogControl implements Action<ProjectModel>{
    public static readonly component: Component = ProjectDialog;

    private readonly projectService: ProjectService;

    private readonly editingProject: ProjectModel | null;
    private actionCtx: ActionContext<ProjectModel> | null = null;

    public isOpen: boolean = this.ref(false);
    public name: string = this.ref("");
    public description: string = this.ref("");

    public isCreation: boolean = this.computed(() => !this.editingProject)

    public constructor(editingProject: ProjectModel | null) {
        super();

        this.projectService = this.ctx.getService(ProjectService);

        this.editingProject = this.readonly(editingProject);
        if (editingProject) {

            this.name = editingProject.name;
            this.description = editingProject.description ?? "";
        }
    }

    public onAction(ctx: ActionContext<ProjectModel>): void {
        if (this.actionCtx) {
            ctx.failAction("Action is already running");
            return;
        }

        this.actionCtx = ctx;
    }

    protected onOpen(): void | Promise<void> {
        this.isOpen = true;
    }

    protected onClose(): void | Promise<void> {
        this.isOpen = false;
        if (this.actionCtx) {
            this.actionCtx.failAction("Modal was closed");
            this.actionCtx = null;
        }
    }

    public async onSubmit(): Promise<void> {
        if (this.isCreation) {
            await this.createProject();
        }

        await this.updateProject();
    }

    private async createProject(): Promise<void> {
        if (!this.actionCtx) {
            return;
        }

        const project: ProjectModel = await this.projectService.createProject(this.name, this.description);
        this.actionCtx.completeAction(project);
    }

    private async updateProject(): Promise<void> {
        if (!this.actionCtx || !this.editingProject) {
            return;
        }

        await this.projectService.updateProject(this.editingProject.project_id, this.name, this.description);
        this.editingProject.name = this.name;
        this.editingProject.description = this.description;
        this.actionCtx.completeAction(this.editingProject);
    }
}