
import { reactive, readonly } from 'vue'

const state = reactive({
  data: [],
  description: ''
})
const actions = {
  setData(res) {
    state.data.push(res)
    // console.log('setData:', state.data)
  },
  setDescription(d) {
    state.description = d
    console.log('setDescription:', state.description)
  },
  async getPokemons() {
    state.data = []
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => actions.getPokemonsInfo(data.results))
  },
  getPokemonsInfo(pokemons) {
    for (const pokemon of pokemons) {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      fetch(url)
        .then(response => response.json())
        .then(data => actions.getPokemonSpecies(data));
    }
  },
  getPokemonSpecies(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
      .then(response => response.json())
      .then(pokemonSpecie => actions.getPokemonDescription(pokemon, pokemonSpecie.flavor_text_entries))
  },
  getPokemonDescription(pokemon, flavorTextEntries) {
    for (let entri of flavorTextEntries) {
      if (entri.language.name === 'es') {
        pokemon.description = entri.flavor_text
        actions.setData(pokemon)
        //Salimos ya que hay muchas versiones del language
        return
      }
    }
  },
}

export default {
  state: readonly(state),
  actions
}
