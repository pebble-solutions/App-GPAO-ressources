<template>
    <div class="input-group mb-3">
        <input type="text" aria-label="Nom materiel" :value="materiel.name" class="form-control">
        <span class="input-group-text"># {{ materielID }}</span>
    </div>

    <div class="input-group">
        <span class="input-group-text">Quantité :</span>
        <input type="number" class="form-control" min="0" :value="materiel.quantité" max="100">
    </div>


</template>

<script>

export default {
    data() {
        return {
            materiel:{},
        }   
    },

    watch: {
        materiel: {
            handler(newValue) {
                if(newValue.quantité == 0){
                    alert("Vous ne pouvez pas mettre la quantité à zero")
                }
            },
            deep: true
        }
    },

    computed: {
        
        /**
         * Retourne une classe italique lorsque le display name est vide.
         * 
         * @returns {String}
         */
         labelClass() {
            return !this.materiel.name ? 'fst-italic' : '';
        },

        materielID() {
            return this.$route.params.id;
        }
    },

    methods: {
        listMateriel(){
			let list=[];
			list.push({id: 1,name: "Ordinateur Portable",quantité:5});
			list.push({id: 2,name: "Stylo Bic",quantité:23});
			list.push({id: 3,name: "Souris Sympa",quantité:3});
			list.push({id: 4,name: "Clavier semi-mechanique de Guillaume",quantité:1});
			return list
		},
        getMateriel() {
            for (let materiel of this.listMateriel()) {
                if (materiel.id == this.$route.params.id) {
                    this.materiel= materiel;
                }
            }
        }
    },

    mounted(){
        this.getMateriel()
    }

}

</script>