<template>
    <div class="d-flex justify-content-center">
      <div class= "card mt-3 col-10">
          <div class="d-block fs-5 w-100 py-2 text-secondary text-center">

              <div class="d-flex flex-row bd-highlight justify-content-center align-items-center m-2">
                  <span class="me-2">#{{ materielID }}</span>
                  <input type ="text" class="form-control no-border fw-bold" :class="labelClass" v-model="materiel.nom">
              </div>

          </div>
      </div>  
  </div>

  <div class="d-flex justify-content-center">
      <div class= "card mt-3 col-10">
          <h5 class="card-title m-2">Caractéristiques techniques : </h5>
          <ul class="list-group container">
              <li class="list-group-item justify-content-center row">       
                  <div class="d-flex flex-row justify-content-center align-items-center">
                      <span class="me-2 col-4">Modèle :</span>
                      <input type ="text" class="form-control no-border" v-model="materiel.modele">
                  </div>  
              </li>
              <li class="list-group-item d-flex justify-content-center row">
                  <div class="d-flex flex-row justify-content-center align-items-center">
                      <span class="me-2 col-4">Numéro de Série :</span>
                      <input type ="text" class="form-control no-border" v-model="materiel.numero_serie">
                  </div> 
              </li>
              <li class="list-group-item d-flex justify-content-center row">
                  <div class="d-flex flex-row justify-content-center align-items-center">
                      <span class="me-2 col-4">Référence :</span>
                      <input type ="text" class="form-control no-border" v-model="materiel.references">
                  </div> 
              </li>
          </ul>
      </div> 
  </div>

  <div class="d-flex justify-content-center">
      <div class= "card mt-3 col-10">
          <div class="form-floating">
              <textarea class="form-control" v-model="materiel.description" id="DescriptionMateriel" style="height: 150px"></textarea>
              <label for="DescriptionMateriel">Description</label>
          </div>
      </div> 
  </div>

  <div class="d-flex justify-content-center">
      <div class= "card mt-3 col-10">
          <div class="form-floating">
              <textarea class="form-control" v-model="materiel.commentaire" id="CommentaireMateriel" style="height: 150px"></textarea>
              <label for="CommentaireMateriel">Commentaire</label>
          </div>
      </div> 
  </div>


</template>

<style>

.no-border {
  border: 0;
  box-shadow: none; /* You may want to include this as bootstrap applies these styles too */

  width:75%;
}

</style>

<script>

import { mapState } from 'vuex'

export default {

    emits: ['modification'],

    data() {
        return {
            materiel:{},
        }   
    },

    watch: {
        /**
         * Surveille l'objet materiel et si une modification est faite, renvoie l'evenement de modification
        */
        materiel: {
            handler(newValue) {
            if (newValue) {
                this.$emit('modification', newValue);
            }
            },
            deep: true
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
         * Retourne l'id du materiel dans l'URL
         * 
         * @returns {number} ID
         */
        materielID() {
            return this.$route.params.id;
        }
    },

    methods: {
        /**
         * Initialise la valeur du materiel actuel
         */
        getMateriel() {
            this.materiel =  this.ressources.find(materiel => materiel.id == this.materielID)
        }
    },

    mounted(){
        if (this.$route.name == "MaterielsEdit") {
            this.getMateriel()
        }
    }

}

</script>