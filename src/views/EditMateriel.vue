<template>
    <AppModal 
        :title="'Modification du domain'" 
        size="md"
        @submit="routeToParent()" 
        @modal-hide="routeToParent()" 
        :submitBtn="submitRes()" 
        :cancelBtn="true">

        <addFormMateriel v-if="$route.params.name == 'MaterielsAdd'"/>
        <modifyFormMateriel v-if="$route.params.name == 'MaterielsEdit'"/>
       
    </AppModal>
</template>

<script>

import AppModal from '../components/pebble-ui/AppModal.vue';
import addFormMateriel from '../components/pebble-ui/materiel/addFormMateriel.vue';
import modifyFormMateriel from '../components/pebble-ui/materiel/modifyFormMateriel.vue';

export default {
    components: { AppModal, addFormMateriel, modifyFormMateriel},
    data() {
        return {
            domain:''
        }
    },
    computed:{

        /**
         * Retourne le nom de domaine de la licence
         * 
         * @returns {string}
         */
        getDomName(){
            return this.$route.params.domain;
        }
    },
    methods: {

        /**
         * Retourne un Booléen selon si le domain contient un caractere ou non
         * 
         * @returns {boolean}
         */
        submitRes(){
            if (!this.domain){
                return false;
            }else{
                return true;
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