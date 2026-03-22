import {UserControl} from "vue-mvvm";

import type {TodoModel} from "@tcmn-hub/todo";


export class TodoTableModel extends UserControl {
    public todos: TodoModel[] = this.ref([]);

    public constructor() {
        super();
    }

    public displayTasks(todos: TodoModel[]): void {
        this.todos = todos;
    }
}