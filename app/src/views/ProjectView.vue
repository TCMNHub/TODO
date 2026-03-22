<script setup lang="ts">
import {useViewModel} from "vue-mvvm";

import {ProjectViewModel} from "@view/ProjectView.model"

import Navbar from "@component/Navbar.vue";
import Main from "@component/Main.vue";

import LucidePlus from "@icon/LucidePlus.vue";
import LucideArrowRight from "@icon/LucideArrowRight.vue";
import LucidePencil from "@icon/LucidePencil.vue";

const vm: ProjectViewModel = useViewModel(ProjectViewModel);
</script>

<template>
    <Navbar>
        <button class="btn btn-sm btn-primary btn-soft" @click="vm.onNewTaskBtn()">
            <LucidePlus/>
            New Task
        </button>
    </Navbar>
    <Main>
        <div class="flex justify-between items-start mb-8">
            <div>
                <div class="flex gap-2 items-end mb-2">
                    <h1 class="text-3xl font-bold">
                        Project {{ vm.name }}
                    </h1>
                    <button class="btn btn-sm btn-ghost" @click="vm.onProjectEditBtn()">
                        <LucidePencil />
                    </button>
                </div>
                <span class="badge badge-soft">
                    {{ vm.creationDate }}
                </span>
            </div>
        </div>

        <div class="card bg-base-200 shadow-sm">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold mb-2">
                        Open task
                    </h2>
                    <button class="btn btn-link btn-primary" @click="vm.onSeeAllBtn()">
                        See all
                        <LucideArrowRight/>
                    </button>
                </div>
                <div class="overflow-x-auto">
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

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Main>
</template>
