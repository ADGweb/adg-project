import Vue from 'vue';
import App from './learning-vue-part4.vue';
import ColorDerectiv from './color';

Vue.directive('colored', ColorDerectiv);

Vue.filter('uppercase', (value) => {
    return value.toUpperCase();
});

const vm = new Vue({
    render : h => h( App ),
})

document.addEventListener( 'DOMContentLoaded', () => {
    const learningVue = document.getElementById( 'learning-vue-part4-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} )
