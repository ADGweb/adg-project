export default {
    bind(el, bindings, vnode) {
        const arg = bindings.arg;
        const fontModifiers = bindings.modifiers['font'];

        console.log('bind');
        console.log(bindings);
        console.log(vnode);
        console.log(bindings.arg);

        if(arg) {
            el.style[arg] = bindings.value;
        }
        else {
            el.style.color = bindings.value; // если передавать параметры в таком виде v-colored="'#6a3525'"
        }

        if(fontModifiers) { // проверка обязательна
            el.style.fontSize = '20px';
        }
    },
    inserted() {
        console.log('inserted');
    },
    update( oldVnode ) {
        console.log('update');
        console.log(oldVnode);
    },
    componentUpdated() {
        console.log('componentUpdated');
    },
    unbind() {
        console.log('unbind');
    }
}
