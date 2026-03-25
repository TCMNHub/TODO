<script setup lang="ts">
import {useDialogControl} from "vue-mvvm/dialog";

import {TodoDialogModel} from "@control/TodoDialog.model";
import Modal from "@component/Modal.vue";


const vm: TodoDialogModel = useDialogControl(TodoDialogModel);
</script>

<template>
    <Modal :vm="vm">
        <h3 v-if="vm.isCreation" class="text-lg font-bold">Create Task</h3>
        <h3 v-else class="text-lg font-bold">Edit Task</h3>
        <form class="my-4 space-y-3" @submit.prevent="vm.onSubmit()">
            <label class="floating-label">
                <input class="input" disabled :value="vm.project.name" />
                <span>Project</span>
            </label>
            <label class="floating-label">
                <input class="input" required :value="vm.title" />
                <span>Title</span>
            </label>
            <label class="floating-label">
                <textarea class="textarea" required :value="vm.description" />
                <span>Description</span>
            </label>
            <label class="floating-label">
                <select class="select">
                    <option v-for="status of vm.statuses" :key="status.status_id" :value="status.status_id">{{ status.name }}</option>
                </select>
            </label>
        </form>
    </Modal>
</template>