<script setup lang="ts">

import type {DialogControl} from "vue-mvvm/dialog";

interface DaisyDialog extends DialogControl {
    isOpen: boolean;
}

defineProps<{
    vm: DaisyDialog
}>();

</script>

<template>
    <dialog class="modal" :open="vm.isOpen">
        <div class="modal-box">
            <slot />
        </div>
        <form method="dialog" class="modal-backdrop" @submit.prevent="vm.closeDialog()">
            <button>close</button>
        </form>
    </dialog>
</template>