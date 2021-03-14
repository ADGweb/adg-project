<template>
    <div class="learning-vue-part5">
        <h2>Работа с формой и ее элементами</h2>
        <div class="learning-vue-part5__wrapper">
            <h3>Input</h3>
            <input
                v-model.lazy="name"
                type="text"
            >
            <p>{{ name }}</p>
        </div>
        <hr>
        <div class="learning-vue-part5__wrapper">
            <h3>Textarea</h3>
            <textarea
                v-model="sameText"
                class="learning-vue-part5__textarea"
            />
            <p class="learning-vue-part5__vmodel-text">
                {{ sameText }}
            </p>
            <p>
                В textarea также удобно использовать v-model, и чтобы сохронялись отступы в конечном
                результате как в исходнике, необходимо исользовать CSS свойство white-space;
            </p>
        </div>
        <hr>
        <div class="learning-vue-part5__wrapper">
            <h3>Checkbox</h3>
            <label>
                <input
                    v-model="socials"
                    type="checkbox"
                    value="vk"
                >
                Vk
            </label>
            <label>
                <input
                    v-model="socials"
                    type="checkbox"
                    value="instagram"
                >
                Instagram
            </label>
            <label>
                <input
                    v-model="socials"
                    type="checkbox"
                    value="twitter"
                >
                Twitter
            </label>
            <ul>
                <li
                    v-for="item in socials"
                    :key="item"
                >
                    {{ item }}
                </li>
            </ul>
            <p>
                Чекбаксы так же связываются с помощью v-model, только в данном случае привязка идет к массиву,
                в который при активации чекбокса попадают значения из их value.
            </p>
        </div>
        <hr>
        <div class="learning-vue-part5__wrapper">
            <h3>Radio button</h3>
            <label>
                <input
                    v-model="socialRadio"
                    type="radio"
                    value="vk"
                >
                Vk
            </label>
            <label>
                <input
                    v-model="socialRadio"
                    type="radio"
                    value="instagram"
                >
                Instagram
            </label>
            <label>
                <input
                    v-model="socialRadio"
                    type="radio"
                    value="twitter"
                >
                Twitter
            </label>
            <p>{{ socialRadio }}</p>
            <p>
                Vue работает с радио кнопками так же как и с чекбоксами, но только на этот раз переменная
                через которое происходит связывание является не массивом, а строкой. Еще стоит отметить что
                во Vue при использовании радио кнопок не нужно писать name, т.к. в v-model и так определяется
                группа к которой они относятся.
            </p>
        </div>
        <hr>
        <div class="learning-vue-part5__wrapper">
            <h3>Select</h3>
            <p>
                Есть 2 способа задать дефолтный option. Первый через директиву selected.
                <strong>:selected="social === defaultSocial"</strong>
            </p>
            <select>
                <option
                    v-for="s in socialsList"
                    :key="s"
                    :selected="s === defaultSocial"
                >
                    {{ s }}
                </option>
            </select>
            <p>
                Второй способ в тег select передать директиву v-model.
            </p>
            <select v-model="social">
                <option
                    v-for="s in socialsList"
                    :key="s"
                >
                    {{ s }}
                </option>
            </select>
            <p>{{ social }}</p>
        </div>
        <hr>
        <div class="learning-vue-part5__wrapper">
            <h3>Модификатор v-model</h3>
            <input
                v-model.number="number"
                type="text"
            >
            <p>{{ number }}</p>
            <p>
                Используя модификатор v-model.number Vue приводит введеый текст к числовому значению,
                если это невозможно, то параметр не обновляется.
            </p>
        </div>
        <hr>
        <div class="learning-vue-part5__wrapper">
            <h3>Создание контрола через v-model</h3>
            <on-off
                v-model="swiched"
            />
            <p>
                Если накладывать v-model на дочерний компонент, то это значение получается в поле props,
                переменная <strong>value</strong>. Что-бы v-model была связана с дочерним компонентом,
                в нем необходимо, при изменении, вызывать метод в котором будет
                <strong>this.$emit('input', newValue)</strong>, где input - это зарезервированное название события.
            </p>
            <p class="learning-vue-part5__conclusion">
                Значение swiched находится в <strong>{{ swiched }}</strong>.
                Это значение мы получаем из дочернего компонента
            </p>
        </div>
    </div>
</template>

<script>
import OnOff from '@/components/onoff/onoff'

export default {
    name: 'LearningVuePart5',
    components: {
        OnOff
    },
    data() {
        return {
            name: 'Дефолтный name',
            sameText: 'Это некий текст',
            socials: [],
            socialRadio: '',
            socialsList: ['vk', 'instagram', 'twitter'],
            defaultSocial: 'twitter',
            social: 'twitter',
            number: 33,
            swiched: false
        }
    },
    methods: {
        chen($emit) {
            this.swiched = $emit;
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

.learning-vue-part5 {
    &__wrapper {
        margin: 48px 0;
    }

    &__textarea {
        width: 300px;
        height: 100px;
    }

    &__vmodel-text {
        white-space: pre-line;
    }

    &__conclusion {
        padding: 6px;
        border: 1px solid $brown-3;
    }
}
</style>