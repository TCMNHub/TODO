<script setup lang="ts">
import {useViewModel} from "vue-mvvm";

import {TodosViewModel} from "@view/TodosView.model";

import Navbar from "@component/Navbar.vue";
import Main from "@component/Main.vue";

import TodoTable from "@control/TodoTable.vue";

const vm = useViewModel(TodosViewModel);
</script>

<template>
    <Navbar>

    </Navbar>
    <Main>
        <div class="card bg-base-200 shadow-sm">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold mb-2">
                        All tasks
                    </h2>
                </div>
                <div class="overflow-x-auto">
                    <TodoTable ref="todo-table" />
                </div>
            </div>
        </div>

    </Main>
</template>
