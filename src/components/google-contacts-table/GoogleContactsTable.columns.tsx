import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IGoogleContact } from 'types/IGoogleContact';
import NameCell from './cells/NameCell';
import IndeterminateCheckbox from 'components/ui/indeterminate-checkbox/IndeterminateCheckbox';

const columnHelper = createColumnHelper<IGoogleContact>();

export const googleContactsTableColumns: ColumnDef<IGoogleContact, any>[] = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor('Name', {
    header: 'Имя',
    cell: NameCell,
  }),
  columnHelper.accessor('Phone 1 - Value', {
    header: 'Телефон',
  }),
];
