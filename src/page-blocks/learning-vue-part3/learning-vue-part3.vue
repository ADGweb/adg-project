<template>
    <div class="learning-vue-part3">
        <h2>Компоненты</h2>
        <h3>Именование компонентов</h3>
        <p>
            Название компонентов нужно использовать в PascalCase: НовыйКомпонент (можно именование
            использовать и kebab-case, но могут возникнуть проблемы с линтерами при регистрации компонента)
        </p>
        <p>В шаблоне название компонентов использовать в kebab-case: &lt;новый-компонент&gt;</p>
        <h3>Рендеринг компонента в шаблон</h3>
        <p>
            Если во время вызова new Vue({}) не задается параметр el, то для того что приложение
            отрендерилось необходимо его смаунтить: vm.$mount(element);
        </p>
        <h3>Передача параметров в дочерний компонент</h3>
        <p>
            Если значение параметра (атрибута компонента) не является строкой, то атрибут нужно байндить, т.е.
            для чисел, переменных, массивов, объектов булевых значений нужен bind.
        </p>
        <car
            :car-name="carName"
            :car-year="2015"
            @nameChanged="chengeNameText"
        />
        <p><span class="learning-vue-part3__attention">{{ carNameText }}</span></p>
        <hr>
        <h3>Передача параметров между дочерними компонентами через шину событийи (event emitter)</h3>
        <p>
            Для этого нужно в .js сделать export const eventEmitter = new Vue(); для создания шины событий.
            В компоненте Car создать кастомное событие в eventEmitter: eventEmitter.$emit('counterUpdated');
            В компоненте Counter спомощью eventEmitter.$on('counterUpdated', () => {}) отлавливаем событие.
            Также необходимо импортировать объект eventEmitter в Car и Counter: import {eventEmitter} from ...
        </p>
        <counter />
        <hr>
        <h3>Изолирование стилей</h3>
        <p>
            Для изолирования стилей необходимо спользовать атрибут scoped в секции style.
            В компоненте Counter изменен цвет для h3, но благодаря scoped, правило работает только для
            данного компонента.
        </p>
        <h3>Передача html дочернему компоненту</h3>
        <p>Дочернему компоненту можно передать html используя тег slot</p>
        <p>
            Можно указать в какой конкретный слот необходимо передать html используя атрибут
            name в дочернем компоненте и атрибут slot  в родительском. Стили для передаваемого html
            можно использовать как в родительском компоненте так и в дочернем. Если в компонентах заданы
            атрибуты scoped, то они оба применятся к переданному html. Так же можно использовать интерполяцию
            в родителском компоненте.
        </p>
        <slot-app>
            <strong>Переданный html</strong>
            <p>Передается в <span class="learning-vue-part3__attention">неименованный</span> slot</p>
            <strong slot="title">{{ slotTitle }}</strong>
            <p slot="text">
                Передается в <span class="learning-vue-part3__attention">именованный</span> slot
            </p>
        </slot-app>
        <slot-app>
            <p slot="text">
                Отдельно передается в <span class="learning-vue-part3__attention">именованный</span> slot
            </p>
        </slot-app>
    </div>
</template>

<script>
import Car from '@/components/car/car.vue';
import Counter from '@/components/counter/counter.vue';
import SlotApp from '@/components/slot-app/slot-app.vue';

export default {
    name: 'LearningVuePart3',
    components: {
        Car,
        Counter,
        SlotApp,
    },
    data() {
        return {
            carName: 'Ford',
            carNameText: '',
            slotTitle: 'Другой переданный html'
        }
    },
    methods: {
        chengeNameText($event) {
            this.carNameText = 'Имя авто изменилось из дочернего компонента на ' + $event
        }
    },
}
</script>

<style lang="scss">
@import '@/rules/rules';

.learning-vue-part3 {
    &__attention {
        color: $brown-1;
    }
}
</style>