<template>
    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <div class="d-block fs-5 w-100 py-2 text-secondary text-center">
                <span class="me-2">#{{ materielID }}</span>
                <strong :class="labelClass">{{materiel.name}}</strong>
            </div>
        </div>  
    </div>

    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-center">
                    <span class="me-2">Quantité :</span> {{ materiel.quantité }}
                </li>
            </ul>
        </div> 
    </div>

    <div class="d-flex justify-content-center">
        <router-link :to="'/materiels/' + this.$route.params.id + '/edit'" v-slot="href">
            <a type="button" class="btn btn-primary m-2 d-flex align-items-center" :href="href">
                <i class="bi bi-tools me-2"></i>
                Modifier le materiel
                <slot></slot>
            </a>
        </router-link>

    </div>

    <router-view/>
</template>

<script>

export default {
    data() {
        return {
            materiel:{},
        }   
    },

    watch: {

        /**
         * Surveille le chemin et selon l'evenement "menuChanged",
         * il affiche la liste associé au menu 
         */
        $route() {
            this.getMateriel();
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