<template>
    <div class="learning-vue">
        <div class="learning-vue__mod">
            <h2>Модификаторы событий</h2>
            <h3>
                <a
                    href="http://google.com"
                    target="_blank"
                    @click.prevent="clickOnGoogle"
                >{{ mod }}</a>
            </h3>
            <h3 @mousemove="handleMouseMove">
                X: {{ x }} / Y: {{ y }}
                <span @mousemove.stop="">Не изменять</span>
            </h3>
            <p>Сработает после Enter (консоль)</p>
            <input
                type="text"
                @keyup.enter="alertValue"
            >
        </div>
        <p>Без модификатора (см. консоль)</p>
        <input
            type="text"
            @keyup="alertValue"
        >
        <div class="learning-vue__form">
            <h2>Работа с формами (v-model)</h2>
            <p>Модификаторы событий можно комбинировать</p>
            <input
                v-model.lazy.trim="inputValue"
                type="text"
            >
            <p>{{ inputValue }}</p>
        </div>
        <div class="learning-vue__form">
            <h2>Игра с классами</h2>
            <h3>Клик: isActive = !isActive</h3>
            <div
                class="learning-vue__circle"
                :class="{'learning-vue__circle_style_red': isActive}"
                @click="isActive = !isActive"
            />
            <h3>v-model="color"</h3>
            <div
                class="learning-vue__circle"
                :class="color"
            />
            <p>...blue/red/green</p>
            <input
                v-model="color"
                type="text"
            >
            <h3>v-model="color" и isActive = !isActive</h3>
            <div
                class="learning-vue__circle"
                :class="[otherColor, {'learning-vue__circle_style_green': isActive}]"
            />
            <p>...blue/red/green</p>
            <input
                v-model="otherColor"
                type="text"
            >
        </div>
        <div class="learning-vue__form">
            <h3>Изменить высоту</h3>
            <div
                class="learning-vue__circle"
                :style="{'height': height + 'px'}"
            />
            <input
                v-model="height"
                type="text"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'LearningVue',
    data() {
        return {
            mod: 'Перейти на Google',
            x: 0,
            y: 0,
            inputValue: 'same value',
            isActive: false,
            color: 'learning-vue__circle_style_red',
            otherColor: 'learning-vue__circle_style_blue',
            height: '100',
        }
    },

    methods: {
        clickOnGoogle() {
            this.mod = 'Переход на Googl отключено модификатором prevent'
        },
        handleMouseMove(event) {
            this.x = event.clientX;
            this.y = event.clientY;
        },
        alertValue(event) {
            console.log(event.target.value);
            console.log(event.code);
            console.log(event.which);
            console.log(event.key);
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';

.learning-vue {
    &__mod {
        width: auto;
        height: 300px;
        padding: 12px;
        border: 1px solid $black-1;
    }

    &__form {
        padding: 12px;
        border: 1px solid $black-1;
    }

    &__circle {
        width: 100px;
        height: 100px;
        margin: 24px;
        border: 1px solid $black-1;
        border-radius: 50%;

        &_style {
            &_red {
                background-color: $red-3;
            }

            &_blue {
                background-color: $blue-3;
            }

            &_green {
                background-color: $green-3;
            }
        }
    }
}

.button-test {
    margin-top: 24px;
    color: $orange-3;
    background-color: $turquoise-3;
}
</style>