<template>
    <AppModal 
        :title="getTitre()" 
        size="lg"
        @submit="saveMateriel()" 
        @modal-hide="routeToParent()" 
        :submitBtn="true" 
        :cancelBtn="true">

        <EditFormMateriel @modification="materielChange"/>
       
    </AppModal>
</template>

<script>

import AppModal from '../components/pebble-ui/AppModal.vue';
import EditFormMateriel from '../components/materiel/EditFormMateriel.vue';
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            materiel:{},
        }   
    },

    components: { AppModal, EditFormMateriel},
    
    computed:{

        ...mapState(['ressources']),

        /**
         * Retourne le nom de de la route
         * 
         * @returns {string}
         */
        getRouteName(){
            return this.$route.name;
        }

    },
    methods: {

        ...mapActions(['refreshRessources', 'addRessources', 'updateRessources']),

        /**
         * Retourne le titre de la modal en fonction du nom de la route
         * 
         * @returns {string}
         */
        getTitre(){
            if (this.getRouteName == 'MaterielsAdd') {
                return "Ajout d'un materiel"
            } else if (this.getRouteName == 'MaterielsEdit') {
                return "Modification du materiel"
            }
        },

        /**
		 * Modifie les informations du materiel sélectionné avant validation.
		 * 
		 * @param {object} materielEdited Object Materiel
		 */
		materielChange(materielEdited) {
			this.materiel = materielEdited;
		},

        /**
         * Enregistre et rafraichis les données modifiées ou ajoutées par l'utilisateur
         */
        saveMateriel(){
            let querryResult = {
                nom : this.materiel.nom,
                commentaire : this.materiel.commentaire,
                modele :  this.materiel.modele,
                numero_serie : this.materiel.numero_serie,
                references : this.materiel.references,
                description : this.materiel.description,
            };

            if (this.getRouteName == 'MaterielsAdd') {
                let id;
                this.$app.apiPost('/v2/ressource/add', querryResult).then(data => {
                id = data.id;
                this.addRessources([data]);
                }).catch(this.$app.catchError)
                .finally(() => {
                    this.refreshRessources(this.ressources);
                    this.$router.push("/materiels/"+ id);
                });
            } else if (this.getRouteName == 'MaterielsEdit') {
                this.$app.apiPatch('/v2/ressource/'+ this.$route.params.id, querryResult).then(data => {
                this.updateRessources([data]);
                }).catch(this.$app.catchError)
                .finally(() => {
                    this.refreshRessources(this.ressources)
                    this.routeToParent();
                });
            }else {
                alert("Erreur lors de l'enregitrement des données, veuillez reéssayer");
                this.routeToParent();
            }
        },

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        }
    }
}
</script>