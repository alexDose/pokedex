import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';

type Props = {
  pageSize: number;
  handlePageSizeChange: (e: SelectChangeEvent<number>) => void;
};

const SelectSizePage = ({ pageSize, handlePageSizeChange }: Props) => {
  return (
    <Select value={pageSize} onChange={handlePageSizeChange} sx={{ height: '36px' }}>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={50}>50</MenuItem>
    </Select>
  );
};

export default SelectSizePage;
