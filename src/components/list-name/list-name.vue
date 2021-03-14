<template>
    <div>
        <input
            v-model="searchName"
            type="text"
        >
        <ul>
            <li
                v-for="name of filtredNames"
                :key="name"
            >
                {{ name }}
            </li>
        </ul>
    </div>
</template>
<script>
import ListNameMixin from './list-name-mixin'
export default {
    mixins: [ListNameMixin]
}
</script>