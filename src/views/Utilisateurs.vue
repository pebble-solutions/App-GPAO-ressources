<template>
    <div class="container">
        <div class="row">
            <div class="col-10">
                <h2 class="m-3">Liste des utilisateurs</h2>
            </div>
        </div>
    </div>
    <RouterView/>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
    inheritAttrs :false,

	components: { RouterView },

}
</script>