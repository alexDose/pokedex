import { AppRootStateType } from '../store';

export const getPokemons = (state: AppRootStateType) => state.pokemons.pokemons;
export const getPokemon = (state: AppRootStateType) => state.pokemons.pokemon;
export const getCurrentPage = (state: AppRootStateType) => state.pokemons.currentPage;
export const getPageSize = (state: AppRootStateType) => state.pokemons.pageSize;
export const getTotalPages = (state: AppRootStateType) => state.pokemons.totalPages;
export const getIsLoading = (state: AppRootStateType) => state.app.isLoading;
export const getIsModal = (state: AppRootStateType) => state.app.isModal;
