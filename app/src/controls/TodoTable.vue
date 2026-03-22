<script setup lang="ts">
import {useUserControl} from "vue-mvvm";

import {TodoTableModel} from "@control/TodoTable.model";

const vm: TodoTableModel = useUserControl(TodoTableModel);
</script>

<template>
    <table class="table">
        <thead>
        <tr>
            <th>Title</th>
            <th>Tags</th>
            <th>Created at</th>
            <th>Due Date</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="todo of vm.todos">
                <td>{{ todo.title }}</td>
                <td></td>
                <td>{{ todo.created_at }}</td>
                <td>{{ todo.due_date }}</td>
                <td>{{ todo.status }}</td>
            </tr>
        </tbody>
    </table>
</template>
