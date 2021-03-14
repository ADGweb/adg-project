<template>
    <div>
        <h2
            v-if="visible"
            v-colored="'#6a3525'"
        >
            Создание собственных директив {{ title }}
        </h2>
        <h3>Регистрация глобальных директив (для родительского и дочерних компонентов)</h3>
        <p>
            Создать файл из которого будет экспортироваться логика директивы (Пример: color). Импортировать его
            содержимое и зарегестрировать директиву через <strong>Vue.directive</strong> (до инициализации компонента).
            Первый параметр - название директивы, второй параметр - экспортированная логика. Также логику директивы
            можно не прописывать в отдельном файле, а прописать во
            <strong>Vue.directive('nameDirective', {логика директивы});</strong>
        </p>
        <p>
            У директивы есть методы, которые являются ее жизненными этапами. В этих методах можно прописывать логику.
        </p>
        <ul>
            <li>
                bind( el, bindings, vnode ) {} - директива создается и прекрепляется к вертуальному DOM;
            </li>
            <li>
                inserted( el, bindings, vnode ) {} - директива находится в реальном DOM;
            </li>
            <li>
                update( el, bindings, vnode, oldVnode ) {} - вызывается, когда происходит изменение в DOM. Если
                обновился родительский компонент/элемент, но еще не обновились дочерние;
            </li>
            <li>
                componentUpdated( el, bindings, vnode, oldVnode ) {} - вызывается когда обновились дочерние элементы;
            </li>
            <li>
                unbihd() {} - вызывается когда дректива заканчивает свое
                существование и убирается из DOM.
            </li>
        </ul>
        <p>Параметры</p>
        <ul>
            <li>el - элемент, к которому привязана директива;</li>
            <li>bindings - свойства, которые передаются в директиву;</li>
            <li>vnode - виртуальная node;</li>
            <li>oldVnode - в этом параметре находится старая виртуальная node до update директивы.</li>
        </ul>
        <button @click="visible = !visible">
            dell
        </button>
        <input
            v-model.lazy="title"
            type="text"
        >
        <p v-colored:background-color="'#7067a2'">
            Работа с кастомной директивой
        </p>
        <p v-colored:color="'#7067a2'">
            Работа с кастомной директивой
        </p>
        <hr>
        <h3>Модификаторы кастомных директив</h3>
        <p v-colored.font="'#6a3525'">
            Модификаторы можно получить из объекта bindings.modifiers
        </p>
        <p>
            Можно делать разнообразные моды (задержки через setTimeout и прочее) и устонавливать
            несколько модов одновременно.
        </p>
        <hr>
        <h3>Локальные директивы (будут недоступны в других компонентах)</h3>
        <p v-font>
            В компоненте необходимо обратится к полю directives и прописать в него название
            директивы и логику (логику можно импортировать из отдельного файла).
        </p>
        <hr>
        <h2>Фильтры</h2>
        <p>Фильтры можно регистрировать как локально так и глобально. Они представляют из себя функции.</p>
        <p>Глобально фильтры регистрируются в файле js, там где рендерится компонент</p>
        <p>Локально фильтр регистрируется в компоненте в поле filters</p>
        <p class="learning-vue-part4__example-filter">
            {{ localFilter | lowercase }}
        </p>
        <p class="learning-vue-part4__example-filter">
            {{ globalFilter | uppercase }}
        </p>
        <p>На элемент можно вешать несколько фильтров</p>
        <hr>
        <h2>Фильтрация списков</h2>
        <p>Для фильтрации списков лучше использовать поле computed, а не filters</p>
        <input
            v-model="searchName"
            type="text"
        >
        <ul>
            <li
                v-for="name of filtredNames"
                :key="name"
            >
                {{ name }}
            </li>
        </ul>
        <hr>
        <h2>Миксины</h2>
        <p>Миксины нужны для того чтобы избавлятся от дублирования кода в компонентах (из тегов script)</p>
        <p>
            Для использования миксина общий функционал необходимо вынести в отдельный файл,
            импортировать этот файл в компонентах и подключить логику в поле mixins.
        </p>
        <list-name />
        <p>При подключении миксина свойства компонента являются приоритетными</p>
        <p>
            Миксин можно подключить глобально в основном файе .js. Необходимо его импортировать
            и подключить используя <strong>Vue.mixin({})</strong>
            Внутрь миксина помещается объект с data, computed, beforeCreated и т.д.
        </p>
    </div>
</template>

<script>
import ListNameMixin from '@/components/list-name/list-name-mixin'
import ListName from '@/components/list-name/list-name'

export default {
    name: 'LearningVuePart4',
    components: {
        ListName
    },
    directives: {
        font : {
            bind(el) {
                el.style.fontSize = '24px';
            }
        }
    },
    filters: {
        lowercase(value) {
            return value.toLowerCase();
        }
    },
    mixins: [ ListNameMixin ],
    data() {
        return {
            title: '(Vue.directive)',
            visible: true,
            globalFilter: 'Глобальная Регистрация',
            localFilter: 'Локальная Регистрация',
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

h2 {
    font-weight: bold;
    font-size: 32px;
}

.learning-vue-part4 {
    &__example-filter {
        display: inline-block;
        margin: 0 48px;
        border: 1px solid $green-1;
    }
}
</style>