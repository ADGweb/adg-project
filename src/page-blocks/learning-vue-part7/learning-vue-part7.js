import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './learning-vue-part7.vue';

Vue.use(VueRouter)

const vm = new Vue({
    render : h => h( App ),
})

document.addEventListener( 'DOMContentLoaded', () => {
    const learningVue = document.getElementById( 'learning-vue-part7-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} )
