<script setup lang="ts">
import {useViewModel} from "vue-mvvm";
import {DialogProvider} from "vue-mvvm/dialog";

import {AppModel} from "./App.model";

import AppShell from "@control/AppShell.vue";

const vm: AppModel = useViewModel(AppModel);
</script>

<template>
    <AppShell :active-dashboard="vm.isDashboardActive" :active-project-id="vm.isProjectActive" :active-todos="vm.isTodosActive">
        <RouterView :key="vm.routerViewKey" />
    </AppShell>
    <DialogProvider />
</template>
