<template>
    <div class="onoff">
        <button
            class="onoff__button"
            :class="{'onoff__button_type_on-active': value}"
            @click="onChange(true)"
        >
            On
        </button>
        <button
            class="onoff__button"
            :class="{'onoff__button_type_off-active': !value}"
            @click="onChange(false)"
        >
            Off
        </button>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        onChange(newValue) {
            this.$emit('input', newValue)
        }
    }
}
</script>
<style lang="scss">
@import '@/rules/rules';

.onoff {
    display: flex;
    justify-content: space-between;
    width: 120px;

    &__button {
        padding: 6px 12px;

        &_type {
            &_on-active {
                background-color: $green-2;
            }

            &_off-active {
                background-color: $red-2;
            }
        }
    }
}
</style>