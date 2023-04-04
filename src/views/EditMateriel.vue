<template>
    <AppModal 
        :title="getTitre()" 
        size="md"
        @submit="routeToParent()" 
        @modal-hide="routeToParent()" 
        :submitBtn="true" 
        :cancelBtn="true">

        <AddFormMateriel v-if="$route.name == 'MaterielsAdd'"/>
        <ModifyFormMateriel v-if="$route.name == 'MaterielsEdit'"/>
       
    </AppModal>
</template>

<script>

import AppModal from '../components/pebble-ui/AppModal.vue';
import AddFormMateriel from '../components/materiel/AddFormMateriel.vue';
import ModifyFormMateriel from '../components/materiel/ModifyFormMateriel.vue';

export default {
    components: { AppModal, AddFormMateriel, ModifyFormMateriel},
    computed:{

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
        getTitre(){
            if (this.getRouteName == 'MaterielsAdd') {
                return "Ajout d'un materiel"
            } else if (this.getRouteName == 'MaterielsEdit') {
                return "Modification du materiel"
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