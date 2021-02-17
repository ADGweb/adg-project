import Vue from 'vue';
import App from './learning-vue-part2.vue';

const vm = new Vue( {
    render : h => h( App ),
} );

window.addEventListener( 'DOMContentLoaded' , () => {
    const learningVue = document.getElementById( 'learning-vue-part2-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} );
