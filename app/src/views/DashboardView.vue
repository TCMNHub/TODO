<script setup lang="ts">
import {useViewModel} from "vue-mvvm";

import {DashboardViewModel} from "@view/DashboardView.model";

import Navbar from "@component/Navbar.vue";
import Main from "@component/Main.vue";

import LucidePlus from "@icon/LucidePlus.vue";

const vm: DashboardViewModel = useViewModel(DashboardViewModel);
</script>

<template>
    <Navbar>
        <button class="btn btn-sm btn-primary btn-soft" @click="vm.onNewProjectBtn()">
            <LucidePlus/>
            New Project
        </button>
    </Navbar>
    <Main>
        Your content goes here.
    </Main>
</template>