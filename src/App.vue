<template>

	<AppWrapper
		:cfg="cfg"
		:cfg-menu="cfgMenu"
		:cfg-slots="cfgSlots"
		
		@auth-change="setLocal_user"
		@structure-change="switchStructure">

		<template v-slot:menu>
			<AppMenu>
				<AppMenuItem href="/materiels" look="dark" icon="bi bi-house">Materiel</AppMenuItem>
				<AppMenuItem href="/utilisateurs" look="dark" icon="bi bi-house">Utilisateurs</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:list v-if="$route.name !== 'Home'">
			
			<AppMenu v-if="includeInRoute('Materiels')">
				<input type="text" class="form-control my-2 px-2" placeholder="Rechercher..." v-model="displaySearch">
				<AppMenuItem :href="'/materiels/'+mat.id" icon="bi bi-file-earmark" v-for="mat in resultSearch()" :key="mat.id">{{mat.nom}}</AppMenuItem>
			</AppMenu>

			<AppMenu v-if="includeInRoute('Utilisateurs')">
				<input type="text" class="form-control my-2 px-2" placeholder="Rechercher..." v-model="displaySearch">
				<AppMenuItem :href="'/utilisateurs/'+us.id" icon="bi bi-file-earmark" v-for="us in resultSearch()" :key="us.id">{{us.cache_nom}}</AppMenuItem>
			</AppMenu>
		</template>

		<template v-slot:core>
			<div class="bg-light" v-if="isConnectedUser">
				<router-view/>
			</div>
		</template>

	</AppWrapper>
	
</template>

<script>

import AppWrapper from '@/components/pebble-ui/AppWrapper.vue'
import AppMenu from '@/components/pebble-ui/AppMenu.vue'
import AppMenuItem from '@/components/pebble-ui/AppMenuItem.vue'
import { mapActions, mapState } from 'vuex'

import CONFIG from "@/config.json"

export default {

	data() {
		return {
			cfg: CONFIG.cfg,
			cfgMenu: CONFIG.cfgMenu,
			cfgSlots: CONFIG.cfgSlots,
			displaySearch: '',
			isConnectedUser: false
		}
	},

	watch: {

		/**
		 * Surveille le chemin et selon l'evenement "menuChanged",
		 * il affiche la liste associé au menu 
		 */
		$route() {
			if (this.$route.name !== 'Home') {
				this.$app.dispatchEvent('menuChanged','list');
			}
		}
	},

	computed: {
		...mapState(['openedElement', 'ressources', 'personnels', 'affectations'])
	},

	methods: {

		...mapActions(['closeElement', 'refreshRessources', 'refreshPersonnels', 'refreshAffectations']),

		/**
		 * Retourne un bouléen en fonction de la route (true si la route contient le nom envoyer par l'utilisateur)
		 * 
		 * @param {string} pathName 
		 * 
		 * @returns {boolean}
		 */
		includeInRoute(pathName){
			if(pathName && this.$route.name) {
				let routeName = this.$route.name;
				return routeName.includes(pathName)
			} else {
				return false;
			}
		},

		/**
		 * Rafraichis la liste des ressources avec les données recuperées de l'API
		 */
		getData(){
			
			this.$app.apiGet('/v2/ressource').then(data => {
				this.refreshRessources(data)
            }).catch(this.$app.catchError);
			
			this.$app.apiGet('/v2/personnel').then(data => {
				this.refreshPersonnels(data)
			}).catch(this.$app.catchError);

			this.$app.apiGet('/v2/affectation').then(data => {
				this.refreshAffectations(data)
			}).catch(this.$app.catchError);

		},

		/**
		 * Retourne un tableau trié selon la recherche faite par l'utilisateur
		 * 
		 * @param {Array} ressource 
		 * 
		 * @returns {Array}
		 */
		resultSearch(){
			if (this.includeInRoute('Materiels')) {
				if (this.ressources.length != 0) {
					let ressource = this.ressources
					if (this.displaySearch !== ''){
						ressource = ressource.filter((item)=>{
							return item.nom.match(this.displaySearch)
						})
					}
	
					return ressource;
				} else if (this.isConnectedUser) {
					this.getData()
				}
			} if (this.includeInRoute('Utilisateurs')) {
				if (this.personnels.length != 0) {
					let listPersonnels = this.personnels
					if (this.displaySearch !== ''){
						listPersonnels = listPersonnels.filter((item)=>{
							return item.cache_nom.match(this.displaySearch)
						})
					}
	
					return listPersonnels;
				} else if (this.isConnectedUser) {
					this.getData()
				}
			}
		},

		/**
		 * Met à jour les informations de l'utilisateur connecté
		 * @param {Object} user Un objet LocalUser
		 */
		setLocal_user(user) {
			if (user) {
				this.$store.dispatch('login', user);
				this.isConnectedUser = true;
			}
			else {
				this.$store.dispatch('logout');
				this.isConnectedUser = false;
			}
		},

		/**
		 * Change de structure, vide le store
		 * 
		 * @param {Integer} structureId
		 */
		switchStructure(structureId) {
			this.$store.dispatch('switchStructure', structureId);
			
			if (this.isConnectedUser) {
				this.$router.push({ path: '/materiels' });
				this.getData();
			}
		}
	}, 

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	},

}
</script>