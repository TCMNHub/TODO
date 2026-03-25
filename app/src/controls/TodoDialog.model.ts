import type { Component } from "vue";
import type { Action, ActionContext } from "vue-mvvm";
import { DialogControl } from "vue-mvvm/dialog";

import { StatusService, TodoService, type ProjectModel, type StatusModel, type TodoModel } from "@tcmn-hub/todo";

import TodoDialog from "@control/TodoDialog.vue";

export class TodoDialogModel extends DialogControl implements Action<TodoModel> {
    public static readonly component: Component = TodoDialog;

    private readonly todoService: TodoService;
    private readonly statusService: StatusService;

    private readonly editingTodo: TodoModel | null;
    private actionCTX: ActionContext<TodoModel> | null = null;
    
    
    public isOpen: boolean = this.ref(false);
    public title: string = this.ref("");
    public description: string = this.ref("");
    public dueDate: string = this.ref("");
    public statusId: string = this.ref("");
    public statuses: StatusModel[] = this.ref([]);

    public readonly isCreation: boolean = this.computed(() => !this.editingTodo);
    public readonly project: ProjectModel;

    public constructor(project: ProjectModel, editingTodo: TodoModel | null) {
        super();

        this.todoService = this.ctx.getService(TodoService);
        this.statusService = this.ctx.getService(StatusService);

        this.project = this.readonly(project);
        this.editingTodo = editingTodo;
    }

    protected async mounted(): Promise<void> {
        this.statuses = await this.statusService.getStatuses();
    }

    protected onOpen(): void {
        this.isOpen = true;
    }

    protected onClose(): void {
        this.isOpen = false;
        if (this.actionCTX) {
            this.actionCTX.failAction("Modal was closed");
            this.actionCTX = null;
        }
    }

    public onAction(ctx: ActionContext<TodoModel>): void | Promise<void> {
        if (this.actionCTX) {
            ctx.failAction("Action is already running");
            return;
        }

        this.actionCTX = ctx;
    }

    public async onSubmit(): Promise<void> {
        if (this.isCreation) {
            await this.createTodo();
            return;
        }

        this.updateTodo();
    }

    private async createTodo(): Promise<void> {
        if (!this.actionCTX) {
            return;
        }
        
        const todo: TodoModel = await this.todoService.createTodo(
            this.project.project_id,
            this.title,
            this.description,
            this.dueDate,
            this.statusId
        );

        this.actionCTX.completeAction(todo);
    }

    private async updateTodo(): Promise<void> {

    }
}