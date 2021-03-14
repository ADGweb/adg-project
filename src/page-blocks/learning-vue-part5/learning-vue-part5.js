import Vue from 'vue';
import App from './learning-vue-part5.vue';

const vm = new Vue({
    render : h => h( App ),
})

document.addEventListener( 'DOMContentLoaded', () => {
    const learningVue = document.getElementById( 'learning-vue-part5-app' );

    if ( learningVue ) {
        vm.$mount( learningVue );
    }
} )
