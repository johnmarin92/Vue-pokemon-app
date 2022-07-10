<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="card" persistent>
      <q-card class="my-card">
        <q-img :src="data.sprites.front_default" />
        <q-card-section>
          <div class="row no-wrap items-center name">
            <div class="col text-h6 ellipsis">
              {{ data.name }}
            </div>
            <div class="col-auto text-grey items-center">
              <q-icon name="lab la-superpowers" />
              {{ data.weight }} KG
            </div>
          </div>
          <div>
            <q-badge
              rounded
              color="warning"
              v-for="item in data.types"
              :key="item.name"
            >
              {{ item.type.name }}
            </q-badge>
          </div>
        </q-card-section>
        <q-separator color="yellow-10" inset />

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 desc">
            {{ data.description }}
          </div>
          <q-separator color="yellow-10" inset />

          <div class="text-caption move">
            <q-badge
              rounded
              color="dark"
              v-for="item in data.moves"
              :key="item"
            >
              {{ item.move.name }}
            </q-badge>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="grey-1"
            label="Close"
            @click="closeDialog"
          />
        </q-card-actions>

        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import store from "./store";

const card = ref(true);

const props = defineProps({ data: Object });
const emit = defineEmits(["onClosePopup"]);
const data = ref(props.data);

const closeDialog = () => {
  emit("onClosePopup", { showDialog: false });
};
</script>

<style scoped>
.my-card {
  background: linear-gradient(#0f0353, #905b24);
}

.name {
  text-transform: uppercase;
  font-size: 15px;
}

.ellipsis {
  color: aliceblue;
  font-weight: bold;
  font-size: 20px;
}

.desc {
  color: rgb(232, 235, 238);
  font-weight: bold;
  margin: 10px;
}

.move {
  color: azure;
  margin-top: 15px;
}
</style>
