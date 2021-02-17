import Vue from 'vue';
import App from './learning-vue.vue';

const vm = new Vue( {
    render : h => h( App ),
} );

window.addEventListener( 'DOMContentLoaded' , () => {
    const learningVue = document.getElementById( 'learning-vue-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} );
