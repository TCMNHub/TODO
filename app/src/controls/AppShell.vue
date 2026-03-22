<script setup lang="ts">
import {useUserControl} from "vue-mvvm";

import {AppShellModel} from "@control/AppShell.model";

import LucideLayoutDashboard from "@icon/LucideLayoutDashboard.vue";
import LucideSettings2 from "@icon/LucideSettings2.vue";
import LucidePlus from "@icon/LucidePlus.vue";
import LucideSquareChartGantt from "@icon/LucideSquareChartGantt.vue";
import LucideListTodo from "@icon/LucideListTodo.vue";

const props = defineProps<{
    activeDashboard?: boolean;
    activeTodos?: boolean;
    activeProjectId?: string;
}>()

const vm = useUserControl(AppShellModel);
</script>

<template>
    <div class="flex min-h-screen">
        <aside class="flex w-64 flex-col items-start bg-base-200 shrink-0 border-r border-base-300">
            <div class="navbar w-full bg-base-300 px-4">
                <h1 class="text-xl">
                    <span class="font-semibold">TCMNHub</span>[<span class="px-1 font-thin text-primary">TODO</span>]
                </h1>
            </div>
            <div class="flex min-h-0 flex-col items-start w-full grow">
                <ul class="menu w-full grow space-y-2">
                    <li :data-active="props.activeDashboard"
                        class="data-[active=true]:menu-active">
                        <button @click="vm.onDashboardBtn()">
                            <LucideLayoutDashboard class="my-1.5 inline-block size-4"/>
                            <span>Dashboard</span>
                        </button>
                    </li>
                    <li :data-active="props.activeTodos"
                        class="data-[active=true]:menu-active">
                        <button @click="vm.onTodosBtn()">
                            <LucideListTodo class="my-1.5 inline-block size-4"/>
                            <span>Tasks</span>
                        </button>
                    </li>
                    <li class="menu-title flex flex-row justify-between cursor-default">
                        Projects
                        <button class="btn btn-xs tooltip tooltip-right" data-tip="New project" @click="vm.onNewProjectBtn()">
                            <LucidePlus/>
                        </button>
                    </li>
                    <li v-for="project of vm.projects"
                        :key="project.project_id"
                        :data-active="project.project_id == props.activeProjectId"
                        class="data-[active=true]:menu-active">
                        <button @click="vm.onProjectItemBtn(project)">
                            <LucideSquareChartGantt class="my-1.5 inline-block size-4" />
                            {{ project.name }}
                        </button>
                    </li>
                </ul>
                <ul class="menu w-full shrink-0 space-y-2">
                    <li>
                        <button>
                            <LucideSettings2 class="my-1.5 inline-block size-4"/>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li class="p-4">
                        <button class="btn btn-ghost btn-square rounded-full"
                                :popovertarget="vm.dropdownName"
                                :style="`anchor-name:--${vm.dropdownName}`">
                            <div class="avatar avatar-placeholder aspect-square p-0 size-10">
                                <div class="bg-neutral text-neutral-content size-10 rounded-full">
                                    <span>CK</span>
                                </div>
                            </div>
                        </button>
                        <Teleport to="body">
                            <ul class="dropdown dropdown-top menu w-48 rounded-box bg-base-200 shadow-sm"
                                popover
                                ref="profileDropdown"
                                :id="vm.dropdownName"
                                :style="`position-anchor:--${vm.dropdownName}`">
                                <li>
                                    <button :popovertarget="vm.dropdownName" popovertargetaction="hide"
                                            class="btn btn-sm btn-ghost justify-start" @click="vm.onProfileBtn()">
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button :popovertarget="vm.dropdownName" popovertargetaction="hide"
                                            class="btn btn-sm btn-soft btn-error justify-start"
                                            @click="vm.onSignOutBtn()">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </Teleport>
                    </li>
                </ul>
            </div>
        </aside>

        <div class="flex grow flex-col">
            <slot />
        </div>
    </div>
</template>