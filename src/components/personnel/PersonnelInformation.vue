<template>
    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <div class="d-block fs-5 w-100 py-2 text-secondary text-center">
                <span class="me-2">#{{ personnelID }}</span>
                <strong :class="labelClass"> {{ personnel.cache_nom }}</strong>
            </div>
        </div>  
    </div>

    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <div v-if="getMateriel.length">
                <h5 class="card-title m-2">Materiel associé : </h5>
                <ul class="ms-5 list-group">
                    <li v-for="matos in getMateriel" :key="matos.id">
                        <div class="container">
                            <div class="row d-flex align-items-center m-2">
                                <span class="col-10">{{ matos.nom }}
                                    <button class="btn mb-1" @click="informationMateriel(matos.id)">
                                        <i class="bi bi-arrow-up-right"></i>
                                    </button>
                                </span>
                                <div class="col"></div>
                                <div class="d-flex justify-content-end col-1 mb-1">
                                    <button class="btn btn-outline-danger" @click="supprMateriel()">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <span class="text-warning">Aucun materiel renseigné</span>
            </div>
        </div> 
    </div>

    <div class="d-flex justify-content-center">
        <router-link :to="'/utilisateurs/' + this.$route.params.id + '/ajoutmateriel'" v-slot="href">
            <a type="button" class="btn btn-primary m-2 d-flex align-items-center" :href="href">
                <i class="bi bi-tools me-2"></i>
                Ajouter un materiel
                <slot></slot>
            </a>
        </router-link>
    </div>


    <router-view/>
</template>

<script>

import { mapState } from 'vuex';

export default {
    data() {
        return {
            personnel: {},
        }   
    },

    watch: {

        /**
         * Surveille le chemin et selon l'id passer en parametre rafraichis et récupere les données
         */
        $route() {
            if (this.$route.params.id) {
                this.getPersonnel();
            }
        }
    },

    computed: {

        ...mapState(['affectations', 'ressources', 'personnels']),
        
        /**
         * Retourne une classe italique lorsque le display name est vide.
         * 
         * @returns {String}
         */
         labelClass() {
            return !this.personnel.cache_nom ? 'fst-italic' : '';
        },

        /**
         * Retourne l'id du client récuperé via les parametre de la route
         * 
         * @returns {number}
         */
        personnelID() {
            return this.$route.params.id;
        },

        getMateriel() {
            let finalMateriel= [];
            let affectationPersonnel = this.affectations.filter(aff => 
                aff.structure_personnel_id == this.personnelID );
            
            for(let ress of this.ressources){
                for (let aff of affectationPersonnel){
                    if (ress.id == aff.ressources_id){
                        finalMateriel.push(ress)
                    }
                }
            }
            return finalMateriel
        }
    },

    methods: {

        /**
         * Supprime et rafraichis le client apres avoir demander une confirmation de la supression
         */
         supprMateriel(){
            if (confirm("Etes vous sur de vouloir supprimer ce materiel? Cette action est définitive.")) {
                    // this.removeRessources([this.client])
                    // this.refreshRessources(this.clients);
                    // this.$router.push("/utilisateurs/");
                    console.log("Ce materiel a bien été retirer au client")
            }
        },

        getPersonnel(){
            this.personnel = this.personnels.find(e => e.id == this.personnelID)
        },

        informationMateriel(id){
            this.$router.push({ path: '/materiels/' + id });
        }
    },

    mounted(){
        this.getPersonnel();
    }

}

</script>