import Vue from 'vue';
import App from './learning-vue.vue';

const vm = new Vue( {
    render : h => h( App ),
} );

window.addEventListener( 'DOMContentLoaded' , () => {
    const test = document.getElementById( 'learning-vue-app' );

    if ( test ) {
        vm.$mount( test );
    }
} );
