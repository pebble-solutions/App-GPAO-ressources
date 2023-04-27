<template>
    
    <div class="mb-3">
        <label for="export_structure__personnel_id" class="form-label">Personnel</label>
        
        <select name="structure__personnel_id" id="export_structure__personnel_id" class="form-select" v-model="sta.structure_personnel_id" required>
            <option :value="personnel.id" v-for="personnel in personnels" :key="personnel.id">{{ personnel.cache_nom }}</option>
        </select>
    </div>
    
    <h5>Affectations</h5>

    <div class="mb-3">
        <label class="form-label">Début d'affectation</label>
        <div class="d-flex align-items-content">
            <Datepicker class="pe-2" :enableTimePicker="false" position="left" format="dd/MM/yyyy" v-model="dda.dda" :preventMinMaxNavigation="true" autoApply required></Datepicker>
            <Datepicker class="ps-2" timePicker modeHeight="120" postion="right" format="HH:mm" v-model="dda.dda_h" autoApply>
                <template #input-icon>
                    <i class="bi bi-clock px-2"></i>
                </template>
            </Datepicker>
        </div>
    </div>

    <div class="mb-3">
        <label class="form-label">Fin d'affectation</label>
        <div class="d-flex align-items-content">
            <Datepicker class="pe-2" :enableTimePicker="false" position="left" format="dd/MM/yyyy" v-model="dfa.dfa" :preventMinMaxNavigation="true" autoApply required></Datepicker>
            <Datepicker class="ps-2" timePicker modeHeight="120" postion="right" format="HH:mm" v-model="dfa.dfa_h" autoApply>
                <template #input-icon>
                    <i class="bi bi-clock px-2"></i>
                </template>
            </Datepicker>
        </div>
    </div>

    <hr>

    <h5>Opérations</h5>

    <div class="mb-3">
        <label class="form-label">Début d'enlèvement</label>
        <div class="d-flex align-items-content">
            <Datepicker class="pe-2" :enableTimePicker="false" position="left" format="dd/MM/yyyy" v-model="denlevement.denlevement" :preventMinMaxNavigation="true" autoApply></Datepicker>
            <Datepicker class="ps-2" timePicker modeHeight="120" postion="right" format="HH:mm" v-model="denlevement.denlevement_h" autoApply>
                <template #input-icon>
                    <i class="bi bi-clock px-2"></i>
                </template>
            </Datepicker>
        </div>
    </div>

    <div class="mb-3">
        <label class="form-label">Fin de restitution</label>
        <div class="d-flex align-items-content">
            <Datepicker class="pe-2" :enableTimePicker="false" position="left" format="dd/MM/yyyy" v-model="drestitution.drestitution" :preventMinMaxNavigation="true" autoApply></Datepicker>
            <Datepicker class="ps-2" timePicker modeHeight="120" postion="right" format="HH:mm" v-model="drestitution.drestitution_h" autoApply>
                <template #input-icon>
                    <i class="bi bi-clock px-2"></i>
                </template>
            </Datepicker>
        </div>
    </div>

    <div class="m-1">
        <div class="form-floating">
            <textarea class="form-control" v-model="sta.remarques" id="CommentaireMateriel" style="height: 150px"></textarea>
            <label for="CommentaireMateriel">Remarque</label>
        </div>
    </div>

</template>



<script>

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { mapState } from 'vuex';
import {padTime , toSqlDate} from '../../js/date.js';

export default {

    emits: ['modification'],

    data() {
        return {
            drestitution: {},
            denlevement: {},
            dfa:{},
            dda:{},
            sta:{},
        }   
    },

    watch: {
        /**
         * Surveille l'objet sta et si une modification est faite, renvoie l'evenement de modification
        */
        sta: {
            handler(newValue) {
            if (newValue) {
                this.$emit('modification', newValue);
            }
            },
            deep: true
        },

        dda: {
            handler(newValue) {
            if (newValue) {
                this.sta.dda = this.dateToString(newValue.dda, newValue.dda_h)
            }
            },
            deep: true
        },

        dfa: {
            handler(newValue) {
            if (newValue) {
                this.sta.dfa = this.dateToString(newValue.dfa, newValue.dfa_h)
            }
            },
            deep: true
        },

        denlevement: {
            handler(newValue) {
            if (newValue) {
                this.sta.denlevement = this.dateToString(newValue.denlevement, newValue.denlevement_h)
            }
            },
            deep: true
        },

        drestitution: {
            handler(newValue) {
            if (newValue) {
                this.sta.drestitution = this.dateToString(newValue.drestitution, newValue.drestitution_h)
            }
            },
            deep: true
        },

    },  

    components: { Datepicker},

    computed: {
      
        ...mapState(['personnels']),

        /**
         * Retourne l'id du materiel récuperé via les parametre de la route
         * 
         * @returns {number}
         */
         getRessourceId() {
            return this.$route.params.id;
        }

    },

    methods: {
        dateToString(date, heure){
            let finalTime = '00:00';

            if(heure) {
                finalTime = padTime(heure.hours) + ':' + padTime(heure.minutes);
            }
            return toSqlDate(date) + ' ' + finalTime
        }
    },

    mounted(){
        this.sta.ressources_id = this.getRessourceId;
    }

}

</script>