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
			</AppMenu>
		</template>

		<template v-slot:list v-if="$route.name !== 'Home'">
			
			<AppMenu v-if="includeInRoute('Materiels')">
				<input type="text" class="form-control my-2 px-2" placeholder="Rechercher..." v-model="displaySearch">
				<AppMenuItem :href="'/materiels/'+mat.id" icon="bi bi-file-earmark" v-for="mat in resultSearch(listMateriel())" :key="mat.id">{{mat.name}}</AppMenuItem>
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
			pending: {
				elements: true
			},
			displaySearch:'',
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
		...mapState(['elements', 'openedElement'])
	},

	methods: {
		includeInRoute(pathName){
			if(pathName && this.$route.name) {
				let routeName = this.$route.name;
				return routeName.includes(pathName)
			} else {
				return false;
			}
		},
		listMateriel(){
			let list=[];
			list.push({id: 1,name: "Ordinateur Portable",});
			list.push({id: 2,name: "Stylo Bic",});
			list.push({id: 3,name: "Souris Sympa",});
			list.push({id: 4,name: "Clavier semi-mechanique de Guillaume",});
			return list
		},

		/**
		 * Retourne une un tableau de String trié selon la recherche faite par l'utilisateur
		 * 
		 * @param {Array} ressource 
		 * 
		 * @returns {Array}
		 */
		resultSearch(ressource){
			let ressourceList = [];
			for (let name of ressource) {
				ressourceList.push(name.name);
			}
			if (this.displaySearch !== ''){
				ressourceList = ressourceList.filter((item)=>{
					return item.match(this.displaySearch)
				})
			}

			let final = [];
			for (let ressources of ressourceList) {
				for ( let data of ressource) {
					if (ressources == data.name) {
						final.push(data);
					}
				}
			}
			return final;
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
		 * Envoie une requête pour lister les éléments et les stocke dans le store
		 * 
		 * @param {Object} params Paramètre passés en GET dans l'URL
		 * @param {String} action 'update' (défaut), 'replace', 'remove'
		 */
		listElements(params, action) {
			if (this.isConnectedUser) {
				action = typeof action === 'undefined' ? 'update' : action;
				this.$app.listElements(this, params)
				.then((data) => {
					this.$store.dispatch('refreshElements', {
						action,
						elements: data
					});
				})
				.catch(this.$app.catchError);
			}
		},

		/**
		 * Change de structure, vide le store
		 * 
		 * @param {Integer} structureId
		 */
		switchStructure(structureId) {
			this.$router.push('/');
			this.$store.dispatch('switchStructure', structureId);

			if (this.isConnectedUser) {
				this.listElements();
			}
		},

		...mapActions(['closeElement'])
	},

	components: {
		AppWrapper,
		AppMenu,
		AppMenuItem
	}

}
</script>