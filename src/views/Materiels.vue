<template>
    <div class="container">
        <div class="row">
            <div class="col-10">
                <h2 class="m-3">Liste des materiels</h2>
            </div>
            <div class="col">
                <router-link to="/materiels/add" v-slot="{ href }">
                    <a type="button" class="btn btn-primary m-2 d-flex align-items-center" :href="href">
                        <i class="bi bi-plus"></i>
                        Ajouter un materiel
                        <slot></slot>
                    </a>
                </router-link>
            </div>
        </div>
    </div>
    <RouterView/>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
    inheritAttrs :false,

	components: {
        RouterLink,
        RouterView
	},

}
</script>