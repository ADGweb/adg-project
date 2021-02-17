<template>
    <h3>Counter: {{ counter }} </h3>
</template>

<script>
import {eventEmitter} from '@/page-blocks/learning-vue-part3/learning-vue-part3.js'

export default {
    data() {
        return {
            counter: 0,
        }
    },
    created() {
        eventEmitter.$on('counterUpdated', () => {
            this.counter++
        }),
        eventEmitter.$on('counterUpdatedByTwo', (increase) => {
            this.counter = this.counter + increase;
        })
    }
}
</script>
<style lang="scss" scoped>
@import '@/rules/rules';

h3 {
    color: $grey-3;
}
</style>