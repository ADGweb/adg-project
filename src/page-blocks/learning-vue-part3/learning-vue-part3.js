import Vue from 'vue';
import App from './learning-vue-part3.vue';

export const eventEmitter = new Vue();

const vm = new Vue( {
    render : h => h( App ),
} );

document.addEventListener( 'DOMContentLoaded' , () => {
    const learningVue = document.getElementById( 'learning-vue-part3-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} );
