<template>
    <div class="learning-vue-part7">
        <div
            class="learning-vue-part7__textarea-wrapper"
        >
            <textarea
                v-model="value"
                class="learning-vue-part7__textarea"
            />
            {{ value }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    }
}
</script>

<style lang="css">
.learning-vue-part7__textarea-wrapper {
    position: relative;
    width: 300px;
    min-height: 60px;
    white-space: pre-line;
}

.learning-vue-part7__textarea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    resize: none;
}
</style>