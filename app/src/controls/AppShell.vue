<script setup lang="ts">
import { useUserControl } from "vue-mvvm";

import { AppShellModel } from "@control/AppShell.model";

import LucidePanelLeftOpen from "@icon/LucidePanelLeftOpen.vue";
import LucideLayoutDashboard from "@icon/LucideLayoutDashboard.vue";
import LucideSettings2 from "@icon/LucideSettings2.vue";

const vm = useUserControl(AppShellModel);
</script>

<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <nav class="navbar w-full bg-base-300">
                <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
                    <LucidePanelLeftOpen />
                </label>
                <div class="px-4">
                    <h1 class="text-xl">
                        <span class="font-semibold">TCMNHub</span>[<span class="px-1 font-thin text-primary">TODO</span>]
                    </h1>
                </div>
            </nav>
            <div class="p-4">
                <slot />
            </div>
        </div>

        <div class="drawer-side is-drawer-close:overflow-visible">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                <ul class="menu w-full grow space-y-2">
                    <li>
                        <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                            <!-- Home icon -->
                            <LucideLayoutDashboard class="my-1.5 inline-block size-4"/>
                            <span class="is-drawer-close:hidden">Dashboard</span>
                        </button>
                    </li>
                </ul>
                <ul class="menu w-full shrink-0 space-y-2">
                    <li>
                        <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                            <LucideSettings2 class="my-1.5 inline-block size-4"/>
                            <span class="is-drawer-close:hidden">Settings</span>
                        </button>
                    </li>
                    <li>
                        <div class="avatar avatar-placeholder aspect-square p-0 size-[40px]">
                            <div class="bg-neutral text-neutral-content size-[40px] rounded-full">
                                <span>CK</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>