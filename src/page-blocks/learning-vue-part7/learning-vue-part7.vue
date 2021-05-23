<template>
    <div class="learning-vue-part7">
        <p>{{ q }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            q: 'qwqwqwq'
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

.learning-vue-part6 {
    &__input {
        margin-top: 24px;
    }

    &__button {
        padding: 6px 12px;
        background-color: $green-2;

        &:hover {
            background-color: $green-1;
        }
    }
}

</style>