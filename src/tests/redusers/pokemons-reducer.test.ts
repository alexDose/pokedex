import {
  fetchPokemons,
  InitialStateType,
  pokemonsReducer,
  setCurrentPage,
  setPageSize,
  setPokemon,
  setPokemons,
  setTotalPages
} from '../../store/reducers/pokemons-reducer';
import { PokemonType } from '../../types/Types';

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    pokemons: [],
    pokemon: {} as PokemonType,
    pageSize: 10,
    currentPage: 1,
    totalPages: 0
  };
});

test('pokemons should be set to the state', () => {
  const pokemons = [
    { id: 4, name: 'charmande' },
    { id: 1, name: 'bulbasau' }
  ];
  const endState = pokemonsReducer(startState, setPokemons(pokemons));

  expect(endState.pokemons[0].name).toBe('charmande');
  expect(endState.pokemons.length).toBe(2);
});

test('pokemon should be set to the state', () => {
  const pokemon = { id: 4, name: 'charmande' };
  const endState = pokemonsReducer(startState, setPokemon(pokemon));

  expect(endState.pokemon).toBe(pokemon);
});

test('correct pageSize should be set', () => {
  const endState = pokemonsReducer(startState, setPageSize(20));

  expect(endState.pageSize).toBe(20);
});

test('correct currentPage should be set', () => {
  const endState = pokemonsReducer(startState, setCurrentPage(5));

  expect(endState.currentPage).toBe(5);
});

test('correct totalPage should be set', () => {
  const endState = pokemonsReducer(startState, setTotalPages(10));

  expect(endState.totalPages).toBe(10);
});
