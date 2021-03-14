<template>
    <div class="learning-vue-part6">
        <h2>Vuelidate</h2>
        <p>
            Что-бы использовать <strong>Vuelidate</strong> необходимо установит npm пакет, импортировать его
            <strong>import Vuelidate from 'vuelidate';</strong> и подключить <strong>Vue.use(Vuelidate);</strong>
            После подключения Vuelidate в компоненте появляется возможноть использовать
            новое поле validates (это объект, ключами у которого являются объекты с именами тех
            полей, которые необходимо валидировать). В объекты передаются параметры валидации,
            которые в свою очередь импортируются
            <strong>import { required, email } from 'vuelidate/lib/validators';</strong>
            Что-бы использовать валидатор его необходимо привязать внутри шаблона, для этого лучше использовать
            прослушку события blur и передать в нее инициализацию валидации <strong>$v</strong>. Далее необходимо
            обратится к полю, которое валидируется <strong>$v.email</strong>. Далее чтобы начать валидацию,
            необходимо вызвать метод <strong>.$touch()</strong><br>
            Для того чтобы валидатор реагировал на вводимое значение, необходимо переписать v-model:
            <strong>v-model.trim.lazy="email"</strong>
        </p>
        <hr>
        <form @submit.prevent="onSubmit">
            <div class="learning-vue-part6__input">
                <label>
                    Введи e-mail
                    <input
                        v-model.trim.lazy="email"
                        type="email"
                        :class="{'is-invalid': $v.email.$error }"
                        @blur="$v.email.$touch()"
                    >
                </label>
            </div>
            <div
                v-if="!$v.email.required && $v.email.$error"
                class="invalid-text"
            >
                Это обязательное поле
            </div>
            <div
                v-if="!$v.email.email"
                class="invalid-text"
            >
                Введен неверный email
            </div>
            <div
                v-if="!$v.email.uniqEmail && $v.email.$error"
                class="invalid-text"
            >
                Email занят
            </div>
            <div class="learning-vue-part6__input">
                <label>
                    Введи пароль
                    <input
                        v-model.trim.lazy="password"
                        type="password"
                        :class="{'is-invalid': $v.password.$error }"
                        @blur="$v.password.$touch()"
                    >
                </label>
            </div>
            <div
                v-if="!$v.password.required && $v.password.$error"
                class="invalid-text"
            >
                Это обязательное поле
            </div>
            <div
                v-if="!$v.password.minLength"
                class="invalid-text"
            >
                Пароль должен содержать минимум 6 символов
            </div>
            <div class="learning-vue-part6__input">
                <label>
                    Повторите пароль
                    <input
                        v-model.trim.lazy="confirmPassword"
                        type="password"
                        :class="{'is-invalid': $v.confirmPassword.$error }"
                        @blur="$v.confirmPassword.$touch()"
                    >
                </label>
            </div>
            <div
                v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$error"
                class="invalid-text"
            >
                Пароли не совпадают
            </div>
            <hr>
            <h2>Создание кастомных асинхронных валидаторов</h2>
            <p>
                Нужно создать асинхронный валидатор, который будет проверять введеный email на уникальность,
                сравнива его с базой данных. Для этого необьходимо создать новое свойство для валидатора,
                которое будет являтся асинхронной функцией.
            </p>
            <button
                class="learning-vue-part6__button"
                :disabled="$v.$invalid"
            >
                Submit
            </button>
            <p>
                Что-бы кнопка была активна только после прохождения валидации формы, необходимо повесить на нее
                <strong>:disabled="$v.$invalid"</strong>. Что-бы сделать отправку формы без перезагрузки страницы
                необходимо повесить на форму <strong>@submit.prevent="onSubmit"</strong>. И в методе onSubmit
                произвести асинхронную отправку. После отправки формы отправленные параметры необходимо привести
                к пустой строке.
            </p>
            <pre>{{ $v }}</pre>
        </form>
    </div>
</template>

<script>
const defaultLength = 6;
const delay = 2500;

import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
    name: 'LearningVuePart6',
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    validations: {
        email: {
            required,
            email,
            uniqEmail: newEmail => {
                if (newEmail === '') {
                    return true
                }

                return new Promise((resololve) => {
                    setTimeout(() => {
                        const value = newEmail !== 'test@mail.ru';

                        resololve(value);
                    }, delay);
                })
            }
        },
        password: {
            required,
            minLength: minLength(defaultLength),
        },
        confirmPassword: {
            sameAs: sameAs('password'),
        }
    },
    methods: {
        onSubmit() {
            console.log('email', this.email);
            console.log('password', this.password);
        }
    }
}
</script>

<style lang="scss">
@import '@/rules/rules';
@import '@/styles/validations';

.learning-vue-part6 {
    &__input {
        margin-top: 24px;
    }

    &__button {
        padding: 6px 12px;
        background-color: $green-2;

        &:hover {
            background-color: $green-1;
        }
    }
}

</style>