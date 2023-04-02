import { PokemonInfoType, PokemonStatsType, PokemonType } from '../../types/Types';
import { Dispatch } from 'redux';
import { getEffectEntriesEn, getId } from '../../common/utilities/Utilities';
import { setIsLoading } from './app-reducer';

const SET_POKEMONS = 'SET-POKEMONS';
const SET_TOTAL_PAGE = 'SET-TOTAL-PAGES';
const SET_PAGE_SIZE = 'SET-PAGE-SIZE';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_POKEMON_STATS = 'SET-POKEMON-STATS';
const SET_POKEMON_INFO = 'SET-POKEMON-INFO';
const SET_POKEMON = 'SET-POKEMON';

const initialState: InitialStateType = {
  pokemons: [],
  pokemon: {} as PokemonType,
  pageSize: 20,
  currentPage: 1,
  totalPages: 0
};

export const pokemonsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_POKEMONS:
      return { ...state, pokemons: [...action.pokemons] };
    case SET_TOTAL_PAGE:
      return { ...state, totalPages: action.totalPages };
    case SET_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_POKEMON_STATS:
      return {
        ...state,
        pokemons: state.pokemons.map((el) =>
          +el.id === action.pokemonStats[0].id ? { ...el, ...action.pokemonStats[0] } : el
        )
      };
    case SET_POKEMON_INFO:
      return {
        ...state,
        pokemons: state.pokemons.map((el) =>
          +el.id === action.pokemonInfo[0].id ? { ...el, ...action.pokemonInfo[0] } : el
        )
      };
    case SET_POKEMON:
      return { ...state, pokemon: action.pokemon };

    default:
      return state;
  }
};

export const setPokemons = (pokemons: PokemonType[]) => {
  return { type: SET_POKEMONS, pokemons };
};
export const setTotalPages = (totalPages: number) => {
  return { type: SET_TOTAL_PAGE, totalPages };
};
export const setPageSize = (pageSize: number) => {
  return { type: SET_PAGE_SIZE, pageSize };
};
export const setCurrentPage = (currentPage: number) => {
  return { type: SET_CURRENT_PAGE, currentPage };
};
export const setPokemonStats = (pokemonStats: PokemonStatsType[]) => {
  return { type: SET_POKEMON_STATS, pokemonStats };
};
export const setPokemonInfo = (pokemonInfo: PokemonInfoType[]) => {
  return { type: SET_POKEMON_INFO, pokemonInfo };
};
export const setPokemon = (pokemon: PokemonType) => {
  return { type: SET_POKEMON, pokemon };
};

export const fetchPokemons = (pageSize: number, currentPage: number) => {
  return async (dispatch: ThunkDispatch) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${pageSize * (currentPage - 1)}`
    );
    const data = await response.json();
    await dispatch(
      setPokemons(
        data.results.map((item: PokemonType) => {
          return {
            id: getId(item.url),
            name: item.name
          };
        })
      )
    );
    dispatch(setTotalPages(Math.ceil(data.count / pageSize)));
    dispatch(setIsLoading(false));
  };
};
export const fetchStats = (id: string) => async (dispatch: ThunkDispatch) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  dispatch(
    setPokemonStats(
      [data].map((item) => {
        return {
          id: item.id,
          name: item.name,
          height: item.height,
          weight: item.weight,
          experience: item.base_experience,
          type: item.types[0].type.name
        };
      })
    )
  );
};
export const fetchInfo = (id: string) => {
  return async (dispatch: ThunkDispatch) => {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
    const data = await response.json();
    dispatch(
      setPokemonInfo(
        [data].map((item) => {
          return {
            id: item.id,
            nameStr: item.name,
            effectEntries: getEffectEntriesEn(item.effect_entries)
          };
        })
      )
    );
  };
};

export type InitialStateType = {
  pokemons: PokemonType[];
  pokemon: PokemonType;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
type ActionType =
  | ReturnType<typeof setPokemons>
  | ReturnType<typeof setTotalPages>
  | ReturnType<typeof setPageSize>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setIsLoading>
  | ReturnType<typeof setPokemonStats>
  | ReturnType<typeof setPokemonInfo>
  | ReturnType<typeof setPokemon>;
type ThunkDispatch = Dispatch<ActionType>;
