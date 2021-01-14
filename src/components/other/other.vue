<template>
    <p>{{ a }}</p>
</template>

<script>
export default {
    props: {
        a: {
            type: String,
            default: 'zzz'
        }
    }
}
</script>