import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './learning-vue-part6.vue';

Vue.use(Vuelidate);

const vm = new Vue({
    render : h => h( App ),
})

document.addEventListener( 'DOMContentLoaded', () => {
    const learningVue = document.getElementById( 'learning-vue-part6-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} )
