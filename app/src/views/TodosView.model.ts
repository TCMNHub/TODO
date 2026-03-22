import {ViewModel} from "vue-mvvm";
import type {Component} from "vue";
import type {RouteAdapter} from "vue-mvvm/router";

import TodosView from "@view/TodosView.vue";

import type {TodoTableModel} from "@control/TodoTable.model";

import {type TodoModel, TodoService} from "@tcmn-hub/todo";

export class TodosViewModel extends ViewModel {
    public static readonly component: Component = TodosView;
    public static readonly route: RouteAdapter = {
        path: "/todos"
    }

    private readonly todoService: TodoService;

    private readonly todoTable: TodoTableModel | null;

    public constructor() {
        super();

        this.todoService = this.ctx.getService(TodoService);

        this.todoTable = this.getUserControl("todo-table");
    }

    protected async mounted(): Promise<void> {
        if (!this.todoTable) {
            return;
        }

        const todos: TodoModel[] = await this.todoService.getTodos();
        this.todoTable.displayTasks(todos);
    }

}