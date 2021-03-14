const indexCheck = -1;

export default {
    data() {
        return {
            names: ['Max', 'Elena', 'Vlad', 'Stas', 'Marina', 'Igor', 'Dima', 'Anna'],
            searchName: ''
        }
    },
    computed: {
        filtredNames() {
            return this.names.filter(name => {
                return name.toLowerCase().indexOf( this.searchName.toLowerCase() ) !== indexCheck;
            })
        }
    }
}