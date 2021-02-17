<template>
    <div class="car">
        <h3>Компонент Car</h3>
        <h4>Name: {{ car }}</h4>
        <p>Year: {{ carYear }}</p>
        <button @click="changeName">
            Изменить имя
        </button>
        <hr>
        <h4>Создание кастомных эвентов и передача параметров</h4>
        <p>
            Уведомить родительский компонент, что в дочернем произошло изменение можно спомощью
            this.$emit('название события', измененная переменная). В родительском компоненте
            нужно поставить слушатель v-on:'название события' и вызвать метод. Получить переданный
            параметр можно спомощью $event.
        </p>
        <hr>
        <button @click="updateCounter">
            Изменить counter на 1
        </button>
        <button @click="updateCounterByTwo">
            Изменить counter на 2
        </button>
    </div>
</template>

<script>
const increase = 2;

import {eventEmitter} from '@/page-blocks/learning-vue-part3/learning-vue-part3.js'

export default {
    name: 'Car',
    props: {
        carName: {
            type: String,
            default: ''
        },
        carYear: {
            type: Number,
            default: 2000
        },
    },
    data() {
        return {
            car: this.carName
        }
    },
    methods: {
        changeName() {
            this.car = 'Mazda';
            this.$emit('nameChanged', this.car);
        },
        updateCounter() {
            eventEmitter.$emit('counterUpdated');
        },
        updateCounterByTwo() {
            eventEmitter.$emit('counterUpdatedByTwo', increase);
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

.car {
    padding: 12px;
    border: 1px solid $black-1;
}
</style>