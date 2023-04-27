import { createStore } from 'vuex'

export default createStore({
	state: {
		structures: [],
		activeStructureId: null,
		login: null,
		elements: [],
		openedElement: null,
		tmpElement: null,
		ressources: [],
		personnels: [],
		affectations: []
	},
	getters: {
		activeStructure(state) {
			return state.structures.find(e => e.id === state.activeStructureId);
		}
	},
	mutations: {
		/**
		 * Charge un objet dans openedElement
		 * @param {Object} state Le state de l'instance VueX
		 * @param {Integer} id L'ID de l'élément à charger
		 */
		open(state, id) {
			state.openedElement = id;
		},


		/**
		 * Ferme l'élément ouvert
		 * @param {Object} state Le state de l'instance VueX
		 */
		close(state) {
			state.openedElement = null;
		},

		/**
		 * Remplace la liste des éléments chargés avec une nouvelle liste
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} elements		La nouvelle liste d'éléments
		 */
		replaceElements(state, elements) {
			state.elements = elements;
		},

		/**
		 * Rafraichie la liste des éléments chargés à partir d'une autre liste.
		 * - si un élément existe dans state et dans elements, il est actualisé avec le nouveau
		 * - si un élément est dans elements mais pas dans state, il est ajouté
		 * @param {Object} state		Le state de l'instance VueX
		 * @param {Array} elements		La nouvelle liste d'éléments
		 */
		updateElements(state, elements) {
			elements.forEach(element => {
				let stateEl = state.elements.find(e => e.id === element.id);

				// Mise à jour d'un élément existant
				if (stateEl) {
					for (let key in element) {
						stateEl[key] = element[key];
					}
				}
				// Ajout d'un élément existant
				else {
					state.elements.push(element);
				}
			});
		},

		/**
		 * Retire des éléments de la liste des éléments chargés
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} elements Les ID des éléments à retirer
		 */
		removeElements(state, elements) {
			elements.forEach(id => {
				let index = state.elements.findIndex(e => e.id === id);

				if (index !== -1) {
					state.elements.splice(index, 1);
				}
			});
		},

		/**
		 * Met à jour les données de l'élément chargé
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} data Liste clé valeur des infos à mettre à jour
		 */
		updateOpened(state, data) {
			for (let key in data) {
				state.openedElement[key] = data[key];
			}
		},

		/**
		 * Enregistre le login dans le store
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} login L'objet Login
		 */
		setLogin(state, login) {
			state.login = login;
		},

		/**
		 * Enregistre les structures chargées dans le store
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Array} structures La liste des structures
		 */
		setStructures(state, structures) {
			state.structures = structures;
		},

		/**
		 * Enregistre une donnée dubliqué de openedElement
		 * @param {Object} state Le state de l'instance vueX
		 * @param {Object} data Un objet identique à la structure de openedElement
		 */
		tmpElement(state, data) {
			state.tmpElement = data;
		},

		/**
		 * Enregistre la structure active dans le store
		 * @param {Object} state Le state de vueX
		 * @param {Integer} structureId L'id de la structure à activer
		 */
		setStructureId(state, structureId) {
			state.activeStructureId = structureId;
		},

		/**
		 * Enregistrer les ressources dans le store
		 * 
		 * @param {Object} state Le state de l'instance VueX 
		 * @param {Array} ressources  Collection d'object ressources
		 */
		setRessources(state, ressources) {
            let aData = ressources.data;
            let mode = ressources.mode;
			
			if ("refresh" === mode) {
                state.ressources = aData;
            } else {
                for (const index in aData) {
                    if ('add' === mode) {
                        state.ressources.push(aData[index]);
                    }
                    if ('update' === mode) {
                        let findIndex = state.ressources.findIndex(e => e.id == aData[index].id);
                        state.ressources[findIndex] = aData[index];
                    }
                    if ('remove' === mode) {
                        let findIndex = state.ressources.findIndex(e => e.id == aData[index].id);
                        if(findIndex !== -1) {
                            state.ressources.splice(findIndex, 1);
                        }
                    }
                }
            }
        },

		/**
		 * Enregistrer les Personnels dans le store
		 * 
		 * @param {Object} state Le state de l'instance VueX 
		 * @param {Array} ressources  Collection d'object Personnels
		 */
		setPersonnels(state, ressources) {
            let aData = ressources.data;
            let mode = ressources.mode;
			
			if ("refresh" === mode) {
                state.personnels = aData;
            } else {
                for (const index in aData) {
                    if ('add' === mode) {
                        state.personnels.push(aData[index]);
                    }
                    if ('update' === mode) {
                        let findIndex = state.personnels.findIndex(e => e.id == aData[index].id);
                        state.personnels[findIndex] = aData[index];
                    }
                    if ('remove' === mode) {
                        let findIndex = state.personnels.findIndex(e => e.id == aData[index].id);
                        if(findIndex !== -1) {
                            state.personnels.splice(findIndex, 1);
                        }
                    }
                }
            }
        },

		/**
		 * Enregistrer les affectations dans le store
		 * 
		 * @param {Object} state Le state de l'instance VueX 
		 * @param {Array} ressources  Collection d'object affectations
		 */
		setAffectations(state, ressources) {
            let aData = ressources.data;
            let mode = ressources.mode;
			
			if ("refresh" === mode) {
                state.affectations = aData;
            } else {
                for (const index in aData) {
                    if ('add' === mode) {
                        state.affectations.push(aData[index]);
                    }
                    if ('update' === mode) {
                        let findIndex = state.affectations.findIndex(e => e.id == aData[index].id);
                        state.affectations[findIndex] = aData[index];
                    }
                }
            }
        },
	},
	actions: {
		/**
		 * Charge un élément depuis le store via son ID
		 * @param {Object} context Instance VueX
		 * @param {Integer} elementId Id de l'élément à charger depuis les éléments existants ou depuis l'API
		 */
		load(context, elementId) {
			let el = context.state.elements.find(e => e.id == elementId);

			if (el) {
				context.commit('open', el);
			}
			else {
				// Il faut générer une requête pour charger l'élément manquant
				console.log('Not found');
			}
		},

		/**
		 * Ferme l'élément ouvert
		 * @param {Object} context Instance VueX
		 */
		unload(context) {
			context.commit('close');
		},

		/**
		 * Met à jour la liste des éléments chargés
		 * @param {Object} context L'instance VueX
		 * @param {Object} payload Les paramètres de rafraichissement
		 * - action			update (default), replace, remove
		 * - elements		la liste des éléments
		 */
		refreshElements(context, payload) {
			if (!('action' in payload)) {
				payload.action = 'update';
			}

			if (payload.action == 'update') {
				context.commit('updateElements', payload.elements);
			}
			else if (payload.action == 'replace') {
				context.commit('replaceElements', payload.elements);
			}
			else if (payload.action == 'remove') {
				context.commit('removeElements', payload.elements);
			}
			else {
				throw new Error(`La mutation ${payload.action} n'existe pas.`);
			}
		},

		/**
		 * Met à jour les infos de l'élément ouvert avec des données
		 * @param {Object} context L'instance vueX
		 * @param {Object} data Liste clé valeur des informations à mettre à jour
		 */
		refreshOpened(context, data) {
			context.commit('updateOpened', data);
		},

		/**
		 * Enregistre l'ouverture d'une session
		 * @param {Object} context L'instance vueX
		 * @param {Object} payload Un objet contenant une clé login et une clé structure
		 */
		login(context, payload) {
			context.commit('setLogin', payload.login);
			context.commit('setStructures', payload.structures);
		},

		/**
		 * Enregistre la fermeture d'une session
		 * @param {Object} context L'instance vueX
		 */
		logout(context) {
			context.commit('setLogin', null);
			context.commit('setStructures', []);
		},

		/**
		 * Bascule sur une structure
		 * @param {Object} context L'instance vueX
		 * @param {Integer} payload L'ID de la structure active
		 */
		switchStructure(context, payload) {
			context.commit('close');
			context.commit('tmpElement', null);
			context.commit('replaceElements', []);
			context.commit('setStructureId', payload);
		},

		/****************************************
		 *            RESSOURCES
		 ***************************************/

		/**
		 * Met a jour les ressources
		 * 
		 * @param {Object} context Instance VueX 
		 * @param {Array} ressources Collection d'object ressources
		 */
		refreshRessources(context, ressources) {
			context.commit('setRessources', {
                mode: "refresh",
                data: ressources,
            })
		},
		/**
		 * * Met a jour un ou plusieur element la liste d asset
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste d'ressources
         */
        updateRessources(context, ressources) {
            context.commit('setRessources', {
                mode: 'update',
                data: ressources,
            });
        },
        /**
         * Initialise un element la liste de ressources type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de ressources asset
         */
        resetRessources(context, ressources) {
            context.commit('setRessources', {
                mode: "reset",
                data: ressources,
            })
        },
        /**
         * Met a jour un ou plusieurs elements de la liste de ressources type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de ressources asset
         */
        addRessources(context, ressources) {
            context.commit('setRessources', {
                mode: 'add',
                data: ressources,
            })
        },
        /**
         * Met a jour un ou plusieurs elements de la liste de ressources type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de ressources asset
         */
        removeRessources(context, ressources) {
            context.commit('setRessources', {
                mode: 'remove',
                data: ressources,
            })
        },

		/****************************************
		 *            PERSONNELS
		 ***************************************/

		/**
		 * Met a jour les ressources
		 * 
		 * @param {Object} context Instance VueX 
		 * @param {Array} ressources Collection d'object ressources
		 */
		refreshPersonnels(context, ressources) {
			context.commit('setPersonnels', {
                mode: "refresh",
                data: ressources,
            })
		},
		/**
		 * * Met a jour un ou plusieur element la liste d asset
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste d'ressources
         */
        updatePersonnels(context, ressources) {
            context.commit('setPersonnels', {
                mode: 'update',
                data: ressources,
            });
        },
        /**
         * Initialise un element la liste de ressources type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de ressources asset
         */
        resetPersonnels(context, ressources) {
            context.commit('setPersonnels', {
                mode: "reset",
                data: ressources,
            })
        },
        /**
         * Met a jour un ou plusieurs elements de la liste de ressources type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de ressources asset
         */
        addPersonnels(context, ressources) {
            context.commit('setPersonnels', {
                mode: 'add',
                data: ressources,
            })
        },
        /**
         * Met a jour un ou plusieurs elements de la liste de ressources type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de ressources asset
         */
        removePersonnels(context, ressources) {
            context.commit('setPersonnels', {
                mode: 'remove',
                data: ressources,
            })
        },

		/****************************************
		 *            AFFECTATIONS
		 ***************************************/

		/**
		 * Met a jour les affectations
		 * 
		 * @param {Object} context Instance VueX 
		 * @param {Array} ressources Collection d'object affectations
		 */
		refreshAffectations(context, ressources) {
			context.commit('setAffectations', {
                mode: "refresh",
                data: ressources,
            })
		},
		/**
		 * * Met a jour un ou plusieur element la liste d asset
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste d'affectations
         */
        updateAffectations(context, ressources) {
            context.commit('setAffectations', {
                mode: 'update',
                data: ressources,
            });
        },
        /**
         * Initialise un element la liste de affectations type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de affectations asset
         */
        resetAffectations(context, ressources) {
            context.commit('setAffectations', {
                mode: "reset",
                data: ressources,
            })
        },
        /**
         * Met a jour un ou plusieurs elements de la liste de affectations type
         * @param {Object} context L'instance vueX
         * @param {array} ressources
         *      - data: Liste de affectations asset
         */
        addAffectations(context, ressources) {
            context.commit('setAffectations', {
                mode: 'add',
                data: ressources,
            })
        },

	},
	modules: {
	}
})
