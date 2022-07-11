<template>
  <img src="../assets/images.png" class="img" alt="image" />
  <div class="flex-container">
    <q-card
      class="card"
      v-for="(pokemon, index) in store.state.data"
      :key="index"
      @click="showDialog(pokemon)"
    >
      <q-img :src="pokemon.sprites.front_default" />
      <q-card-section>
        <div class="name">{{ pokemon.name }}</div>
        <div>
          <q-badge
            rounded
            color="dark"
            v-for="item in pokemon.types"
            :key="item.name"
          >
            {{ item.type.name }}
          </q-badge>
        </div>
        <div class="weight">{{ pokemon.weight }} KG</div>
      </q-card-section>
      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </div>
  <Dialog
    v-if="enableDialog"
    @onClosePopup="closeDialog($event)"
    :data="pokemonSelected"
  />
</template>

<script setup>
import store from "./store";
import Dialog from "./Dialog.vue";
import { ref } from "vue";

const enableDialog = ref(false);
const pokemonSelected = ref({});

const showDialog = (pokemon) => {
  pokemonSelected.value = pokemon;
  enableDialog.value = true;
};

const closeDialog = (item) => {
  enableDialog.value = item.showDialog;
};

store.actions.getPokemons();
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 90%;
  height: 150%;
  margin: 0 auto;
}
.card {
  background: linear-gradient(#2fa272, #267088);
  background-color: #267084;
  box-shadow: 5px 8px 5px 2px #267084;
  width: 170px;
  height: 260px;
  border-radius: 20px;
  margin: 15px;
  float: left;
}
.img {
  display: block;
  width: 30%;
  height: 30%;
  margin: 0 auto;
}
.name {
  color: aliceblue;
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
}
.weight {
  color: rgb(52, 17, 210);
  font-weight: bold;
  font-size: 15px;
}
</style>
