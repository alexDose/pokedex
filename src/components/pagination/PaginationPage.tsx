import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent } from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (e: ChangeEvent<unknown>, page: number) => void;
};

const PaginationPage = ({ currentPage, totalPages, handlePageChange }: Props) => {
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={handlePageChange}
        page={currentPage}
        count={totalPages}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
};

export default PaginationPage;
