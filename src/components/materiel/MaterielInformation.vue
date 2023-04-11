<template>
    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <div class="d-block fs-5 w-100 py-2 text-secondary text-center">
                <span class="me-2">#{{ materielID }}</span>
                <strong :class="labelClass">{{materiel.nom}}</strong>
            </div>
        </div>  
    </div>

    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <h5 class="card-title m-2">Caractéristiques techniques : </h5>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-center">
                    <span class="me-2">Modèle :</span> 
                    <span v-if="materiel.modele">{{ materiel.modele }}</span>
                    <span class="text-warning" v-else>Modèle non renseigné</span>
                </li>
                <li class="list-group-item d-flex justify-content-center">
                    <span class="me-2">Numéro de Série :</span> 
                    <span v-if="materiel.numero_serie">{{ materiel.numero_serie }}</span>
                    <span class="text-warning" v-else>Numéro de série non renseigné</span>
                </li>
                <li class="list-group-item d-flex justify-content-center">
                    <span class="me-2">Référence :</span> 
                    <span v-if="materiel.references">{{ materiel.references }}</span>
                    <span class="text-warning" v-else>Référence non renseigné</span>
                </li>
            </ul>
        </div> 
    </div>

    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <div class="form-floating" v-if="materiel.description">
                <textarea class="form-control" :value="materiel.description" id="DescriptionMateriel" style="height: 150px"></textarea>
                <label for="DescriptionMateriel">Description</label>
            </div>

            <div class="m-2" v-else>
                <span class="text-warning">
                    Aucune description renseignée
                </span>
            </div>
        </div> 
    </div>

    <div class="d-flex justify-content-center">
        <div class= "card mt-3 col-6">
            <div class="form-floating" v-if="materiel.commentaire">
                <textarea class="form-control" :value="materiel.commentaire" id="CommentaireMateriel" style="height: 150px"></textarea>
                <label for="CommentaireMateriel">Commentaire</label>
            </div>
            <div class="m-2" v-else>
                <span class="text-warning">
                    Aucun commentaire renseigné
                </span>
            </div>
        </div> 
    </div>

        <!-- 
    affected: null
    client_id: 65
    consommable: "NON"
    en_service: "OUI"
    fournisseur_id: 0
    raison_hors_service: ""
    ref_fournisseur: ""
    ref_interne: ""
    valeur_ht: 0 -->

    <div class="d-flex justify-content-center">
        <router-link :to="'/materiels/' + this.$route.params.id + '/edit'" v-slot="href">
            <a type="button" class="btn btn-primary m-2 d-flex align-items-center" :href="href">
                <i class="bi bi-tools me-2"></i>
                Modifier le materiel
                <slot></slot>
            </a>
        </router-link>

        <button type="button" class="btn btn-danger m-2" @click="supprMateriel()"> 
            <i class="bi bi-trash me-2"></i> 
            Supprimer
        </button>
    </div>


    <router-view/>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            materiel:{},
        }   
    },

    watch: {

        /**
         * Surveille le chemin et selon l'id passer en parametre rafraichis et récupere les données
         */
        $route() {
            if (this.$route.params.id) {
                this.getMateriel()
            }
        }
    },

    computed: {

        ...mapState(['ressources']),
        
        /**
         * Retourne une classe italique lorsque le display name est vide.
         * 
         * @returns {String}
         */
         labelClass() {
            return !this.materiel.name ? 'fst-italic' : '';
        },

        /**
         * Retourne l'id du materiel récuperé via les parametre de la route
         * 
         * @returns {number}
         */
        materielID() {
            return this.$route.params.id;
        }
    },

    methods: {

        ...mapActions(['refreshRessources', 'removeRessources']),

        /**
         * Retourne les infiormations du materiel via un appel l'API
         */
        getMateriel() {
            this.$app.apiGet('/v2/ressource/' + this.materielID, {
            }).then(data => {
				this.materiel = data
            }).catch(this.$app.catchError)
        },

        /**
         * Supprime et rafraichis le materiel apres avoir demander une confirmation de la supression
         */
        supprMateriel(){
            if (confirm("Etes vous sur de vouloir supprimer ce materiel? Cette action est définitive.")) {
                this.$app.apiDelete('/v2/ressource/' + this.materielID, {
                }).then(data => {
                    data.id = this.materielID
                    this.removeRessources([data])
                }).catch(this.$app.catchError)
                .finally(() => {
                    this.refreshRessources(this.ressources);
                    this.$router.push("/materiels/");
                });
            }
        }
    },

    mounted(){
        this.getMateriel()
    }

}

</script>