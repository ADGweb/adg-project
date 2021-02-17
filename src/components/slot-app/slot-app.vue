<template>
    <div class="slot">
        <slot />
        <hr>
        <hr>
        <slot name="title" />
        <hr>
        <slot name="text" />
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import '@/rules/rules';

.slot {
    width: 300px;
    padding: 18px;
    border: 2px solid $blue-3;
}
</style>