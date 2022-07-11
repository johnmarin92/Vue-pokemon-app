import { reactive, readonly } from "vue";
import { Notify } from 'quasar'

const state = reactive({
  data: [],
  description: "",
});
const actions = {
  setData(res) {
    state.data.push(res);
    // console.log('setData:', state.data)
  },
  setDescription(d) {
    state.description = d;
    console.log("setDescription:", state.description);
  },
  //FUNCION QUE TRAE LISTA DE POKEMONS
  async getPokemons() {
    state.data = [];
    fetch("https://pokeapi.co/api/v2/pokemonn/")
    .then((response) => response.json())
    .then((data) => actions.getPokemonsInfo(data.results))
    .catch(function(error) {
      Notify.create({
        message: 'Error de conexión con el Servidor',
        color: 'red-12',
        textColor: 'white',
        icon: 'error'
      })
    });
  },
  //FUNCION QUE RECIBE LISTA DE POKEMONS Y CONSULTA PARA CADA UNO SU INFORMACION
  getPokemonsInfo(pokemons) {
    for (const pokemon of pokemons) {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => actions.getPokemonSpecies(data))
        .catch(function(error) {
          Notify.create({
            message: 'Error de conexión con el Servidor',
            color: 'red-12',
            textColor: 'white',
            icon: 'error'
          })
        });
    }
  },
  /*
    FUNCION QUE CONSULTA DESCRIPCION DE POKEMON Y POSTERIORMENTE GUARDA TODO EL ARRAY DE POKEMONS
    CON SU DESCRIPCION EN ESPAÑOL
  */
  getPokemonSpecies(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
      .then((response) => response.json())
      .then((pokemonSpecie) =>
        actions.getPokemonDescription(
          pokemon,
          pokemonSpecie.flavor_text_entries
        )
      )
      .catch(function(error) {
        Notify.create({
          message: 'Error de conexión con el Servidor',
          color: 'red-12',
          textColor: 'white',
          icon: 'error'
        })
      });
  },
  getPokemonDescription(pokemon, flavorTextEntries) {
    for (let entri of flavorTextEntries) {
      if (entri.language.name === "es") {
        pokemon.description = entri.flavor_text;
        actions.setData(pokemon);
        //Salimos ya que hay muchas versiones del language
        return;
      }
    }
  },
};

export default {
  state: readonly(state),
  actions,
};
