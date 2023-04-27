<template>
    <AppModal 
        title="Affecter un personnel" 
        size="lg"
        @submit="saveAffectation()" 
        @modal-hide="routeToParent()" 
        :submitBtn="true" 
        :cancelBtn="true">

        <FormAffected @modification="affectationChange" ></FormAffected>

       
    </AppModal>
</template>

<script>

import AppModal from '../components/pebble-ui/AppModal.vue';
import FormAffected from '../components/materiel/FormAffected.vue';
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            sta: {},
        }   
    },

    components: { AppModal, FormAffected},

    computed: {
        ...mapState(['affectations']),
    },

    methods: {

        ...mapActions(['refreshAffectations', 'addAffectations', 'updateAffectations']),

        /**
		 * Modifie les informations de l'affectation sélectionnée avant validation.
		 * 
		 * @param {object} affectationEdited Object Materiel
		 */
        affectationChange(affectationEdited) {
			this.sta = affectationEdited;
		},

        /**
         * Enregistre et rafraichis les données modifiées ou ajoutées par l'utilisateur
         */
        saveAffectation(){

            this.$app.apiPost('/v2/affectation', this.sta).then(data => {
                    this.addAffectations([data])
                }).catch(this.$app.catchError)
                .finally(() => {
                    this.refreshAffectations(this.affectations);
                    this.routeToParent()
                });
        },

        /**
         * retourne à la route précédente
         */
        routeToParent() {
            this.$router.go(-1);
        }
    },
}
</script>