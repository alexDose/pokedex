import { ChangeEvent, useEffect, useState } from 'react';
import styles from './App.module.scss';
import SearchInput from './components/searchInput/SearchInput';
import ModalWindow from './components/modalWindow/ModalWindow';
import { CircularProgress, SelectChangeEvent } from '@mui/material';
import Pokemon from './components/item/Pokemon';
import { PokemonType } from './types/Types';
import SelectSizePage from './components/select/SelectSizePage';
import PaginationPage from './components/pagination/PaginationPage';
import { useSelector } from 'react-redux';
import {
  fetchPokemons,
  setCurrentPage,
  setPageSize,
  setPokemon
} from './store/reducers/pokemons-reducer';
import { AppRootStateType, useAppDispatch } from './store/store';
import { setIsModal } from './store/reducers/app-reducer';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();

  const pokemons = useSelector<AppRootStateType, PokemonType[]>((state) => state.pokemons.pokemons);
  const currentPage = useSelector<AppRootStateType, number>((state) => state.pokemons.currentPage);
  const pageSize = useSelector<AppRootStateType, number>((state) => state.pokemons.pageSize);
  const totalPages = useSelector<AppRootStateType, number>((state) => state.pokemons.totalPages);
  const isLoading = useSelector<AppRootStateType, boolean>((state) => state.app.isLoading);
  const isModal = useSelector<AppRootStateType, boolean>((state) => state.app.isModal);
  const pokemon = useSelector<AppRootStateType, PokemonType>((state) => state.pokemons.pokemon);

  const getFilteredItems = (items: PokemonType[]) => {
    return items.filter((item) => item.name.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
  };
  const openModalWindow = async (pokemon: PokemonType) => {
    await dispatch(setPokemon(pokemon));
    dispatch(setIsModal(true));
  };
  const closeModalWindow = () => {
    dispatch(setIsModal(false));
  };
  const handleCurrentPageChange = (e: ChangeEvent<unknown>, currentPage: number) => {
    dispatch(setCurrentPage(currentPage));
  };
  const handlePageSizeChange = (e: SelectChangeEvent<number>) => {
    dispatch(setPageSize(+e.target.value));
  };

  useEffect(() => {
    dispatch(fetchPokemons(pageSize, currentPage));
  }, [pageSize, currentPage]);

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Pokemons</h1>
        <SelectSizePage pageSize={pageSize} handlePageSizeChange={handlePageSizeChange} />
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handleCurrentPageChange}
        />
        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={styles.items}>
          {getFilteredItems(pokemons).length ? (
            getFilteredItems(pokemons).map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} openModalWindow={openModalWindow} />
            ))
          ) : (
            <div className={styles.text}>Not found</div>
          )}
        </div>
      )}
      {isModal && (
        <ModalWindow pokemon={pokemon} isModal={isModal} closeModalWindow={closeModalWindow} />
      )}
    </div>
  );
}

export default App;
