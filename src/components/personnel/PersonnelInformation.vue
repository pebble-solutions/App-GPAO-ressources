<template>
    <div class="d-flex justify-content-center">
        <div class= "card w-75 mt-3 col-6">
            <div class="d-block fs-5 w-100 py-2 text-secondary text-center">
                <span class="me-2">#{{ personnelID }}</span>
                <strong class="fst-italic"> {{ personnel.cache_nom }}</strong>
            </div>
        </div>  
    </div>

    <div class="d-flex justify-content-center">
        <div class= "card w-75 mt-3 col-6">
            <div v-if="getMateriel.length">
                <h5 class="card-title m-2">Materiel associé : </h5>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-center align-items-center">
                        <div class="container">
                            <div class="row">
                                <div class="col-1">

                                </div>
                                <div class="col-4">
                                    <span>Materiel</span> 
                                </div>
                                <div class="col-3">
                                    <span>Date de début :</span>
                                </div>
                                <div class="col-2">
                                    <span>Date de fin :</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item" v-for="matos in getMateriel" :key="matos.id">
                        <div class="container">
                            <div class="row d-flex justify-content-start align-items-center">
                                <button class="btn col-1" @click="informationMateriel(matos.id)">
                                    <i class="bi bi-arrow-up-right me-2"></i>
                                </button>
                                <span class="col-4">{{ matos.nom }}</span>
                                <div class="col-3">{{ getdateFormat(matos.affectations.dda) }}</div>
                                <div class="col-3">{{ getdateFormat(matos.affectations.dfa) }}</div>
                                <div class="d-flex justify-content-end col-1 mb-1">
                                    <button class="btn btn-outline-danger" @click="supprMateriel(matos.affectations)">
                                        Désaffecter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <span class=" mx-2 text-muted">Aucun materiel renseigné</span>
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

import { mapState, mapActions } from 'vuex';
import { dateFormat, toSqlDate } from '../../js/date.js';

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
                        ress.affectations = aff;
                        finalMateriel.push(ress)
                    }
                }
            }
            return finalMateriel
        }
    },

    methods: {

        ...mapActions(['refreshAffectations', 'updateAffectations']),

        getdateFormat(date){
            return dateFormat(date)
        },

        /**
         * Supprime et rafraichis le client apres avoir demander une confirmation de la supression
         */
         supprMateriel(affectation){
             if (confirm("Etes vous sur de vouloir supprimer ce materiel? Cette action est définitive.")) {
                let today = new Date();
                affectation.drestitution = toSqlDate(today);
                
                this.$app.api.patch('/v2/affectation/'+ affectation.id, affectation).then(data => {
                    this.updateAffectations([data]);
                }).catch(this.$app.catchError)
                .finally(() => {
                    this.refreshAffectations(this.affectations)
                });
                // console.log("Ce materiel a bien été retirer au client")
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