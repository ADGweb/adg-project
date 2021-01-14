<template>
    <div>
        <div>{{ qw }}</div>
        <button
            class="button-test"
            @click="www"
        >
            Смена
        </button>
        <button
            class="button-test"
            @click="buttonClick"
        >
            Button
        </button>
        <test />
        <other
            :a="a"
        />
    </div>
</template>

<script>
import test from '@/components/test/test.vue'
import other from '@/components/other/other.vue'
export default {
    name: 'LearningVue',
    components: {
        test,
        other
    },

    data() {
        return {
            qw: 'ssssqqqq',
            a: 'ppppapapa'
        }
    },

    methods: {
        www() {
            this.qw = 'qwqwqwqwxcxc11111';
        },
        buttonClick() {
            this.a = this.qw;
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

.button-test {
    margin-top: 24px;
    color: $orange-3;
    background-color: $turquoise-3;
}
</style>