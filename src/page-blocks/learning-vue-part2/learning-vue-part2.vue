<template>
    <div class="learning-vue-part2">
        <p>
            Тут удобно блоки оборачивать в теги template, чтобы не использовать лишнюю
            обертку в виде div (template из DOM удаляется)
        </p>
        <template v-if="isVisible">
            <h2>Первый</h2>
            <p>Некий текст</p>
        </template>
        <template v-else>
            <h2>Второй</h2>
            <p>Другой некий текст</p>
        </template>
        <button @click="isVisible = !isVisible">
            Смена
        </button>
        <p v-show="isVisible">
            Работа с v-show
        </p>
        <hr>
        <p>Перебор массива</p>
        <ul>
            <li
                v-for="person in people"
                :key="person"
            >
                {{ person }}
            </li>
            <li
                v-for="(person, index) in people"
                :key="index"
            >
                {{ index + 1 }} {{ person }}
            </li>
        </ul>
        <hr>
        <p>Перебор объекта</p>
        <ol>
            <li
                v-for="value in men"
                :key="value"
            >
                {{ value }}
            </li>
            <li
                v-for="(value, key, index) in men"
                :key="key"
            >
                {{ value }} {{ key }} {{ index }}
            </li>
        </ol>
        <hr>
        <h3>Счетчик {{ counter }}</h3>
        <p>
            Чтобы получить event в методе, нужно или не передавать параметры в метод riseCounter, и тогда до него можно
            добраться, или если параметры передаются, event тоже необходимо передавать riseCounter(5, $event)
        </p>
        <button @click="riseCounter(5, $event)">
            Увеличить на 5
        </button>
        <hr>
        <h3>Watch</h3>
        <p>
            Поле позволяет следить за перменными и при их изменении вызывать функции. Для этого в поле watch
            необходимо функцию назвать также как переменную. Пример: при изменении счетчика (выше), будет вызываться
            console.log. В функцию wath прилетает атрибут value, который равен текущему значению переменной.
        </p>
        <hr>
        <h3 ref="heading">
            Ref
        </h3>
        <button @click="addInfo">
            Кнопка
        </button>
        <p>{{ refInfo }}</p>
        <hr>
        <h3>Жизненный цыкл</h3>
        <p>Смотреть в консоле</p>
        <button @click="counter++">
            Change
        </button>
        <button @click="doDestroy">
            Destroy
        </button>
    </div>
</template>

<script>

export default {
    name: 'LearningVuePart2',
    data() {
        return {
            isVisible: true,
            people: [
                'Max',
                'Elena',
                'Vlad'
            ],
            men: {
                name: 'Max',
                age: '30',
                job: 'Frontend'
            },
            counter: 0,
            refInfo: ''
        }
    },
    watch: {
        counter(value) {
            console.log(`watch следит за counter. Counter изменился, теперь он равен ${value}`);
        }
    },
    beforeCreate() {
        console.log('beforeCreate: произошла инициализация, Vue готовится создать новое приложение');
    },
    created() {
        console.log('created: Vue-приложение создано, инициализации шаблона еще не было');
    },
    beforeMount() {
        console.log('beforeMount: Vue скомпилировал шаблон и готовится его вставить');
    },
    mounted() {
        console.log('mounted: этап на котором HTML дерево из Vue-приложения вставилось в DOM');
    },
    beforeUpdate() {
        console.log('beforeUpdate: перед изменением в шаблоне');
    },
    updated() {
        console.log('update: изменение в шаблоне закончено');
    },
    beforeDestroy() {
        console.log('beforeDestroy: перед уничтожение приложения');
    },
    destroyed() {
        console.log('destroyed: приложение уничтожено');
    },
    methods: {
        riseCounter(num, event) {
            this.counter += num;
            console.log(event);
        },
        addInfo(){
            this.refInfo = 'Посмотри консоль';
            console.log(this.$refs.heading);
            this.$refs.heading.style.color = 'red';
        },
        doDestroy() {
            this.$destroy();
        }

    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

</style>