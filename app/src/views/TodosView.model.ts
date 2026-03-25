import {ViewModel} from "vue-mvvm";
import type {Component} from "vue";
import type {RouteAdapter} from "vue-mvvm/router";

import TodosView from "@view/TodosView.vue";

import {type TodoModel, TodoService} from "@tcmn-hub/todo";

export class TodosViewModel extends ViewModel {
    public static readonly component: Component = TodosView;
    public static readonly route: RouteAdapter = {
        path: "/todos"
    }

    private readonly todoService: TodoService;

    public todos: TodoModel[] = this.ref([]);

    public constructor() {
        super();

        this.todoService = this.ctx.getService(TodoService);

    }

    protected async mounted(): Promise<void> {
        this.todos = await this.todoService.getTodos();
    }

}