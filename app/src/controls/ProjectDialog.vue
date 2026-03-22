<script setup lang="ts">
import {useDialogControl} from "vue-mvvm/dialog";

import {ProjectDialogModel} from "@control/ProjectDialog.model";

import Modal from "@component/Modal.vue";

const vm: ProjectDialogModel = useDialogControl(ProjectDialogModel);
</script>

<template>
    <Modal :vm="vm">
        <h3 v-if="vm.isCreation" class="text-lg font-bold">Create Project</h3>
        <h3 v-else class="text-lg font-bold">Edit Project</h3>
        <form class="my-4 space-y-3" @submit.prevent="vm.onSubmit()">
            <label class="floating-label">
                <input class="input w-full" placeholder="Name" v-model="vm.name" required />
                <span>Name</span>
            </label>
            <label class="floating-label">
                <textarea class="textarea w-full h-32" placeholder="Description" v-model="vm.description" />
                <span>Description</span>
            </label>

            <div class="join justify-end w-full mt-8">
                <button class="join-item btn btn-soft" type="button" @click="vm.closeDialog()">
                    Cancel
                </button>
                <button class="join-item btn btn-soft btn-primary" type="submit">
                    Save
                </button>
            </div>
        </form>
    </Modal>
</template>
