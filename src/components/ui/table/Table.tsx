import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  Updater,
  functionalUpdate,
} from '@tanstack/react-table';
import styles from './Table.module.scss';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableRowSelection?: boolean;
  selectedRowKey?: keyof TData;
  updateData?: (rowIndex: number, columnId: string, value: any) => void;
  autoResetPageIndex?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelect?: (rows: RowSelectionState) => void;
}

const Table = <TData, TValue>({
  columns,
  data,
  enableRowSelection,
  selectedRowKey,
  updateData,
  autoResetPageIndex,
  rowSelection,
  onRowSelect,
}: TableProps<TData, TValue>) => {
  const rowSelectHandler = (updater: Updater<RowSelectionState>) => {
    if (!rowSelection || !onRowSelect) return;
    const select = functionalUpdate(updater, rowSelection);
    onRowSelect(select);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    //@ts-ignore
    getRowId: enableRowSelection ? (row) => row[selectedRowKey] : undefined,
    enableRowSelection,
    onRowSelectionChange: rowSelectHandler,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex,
    meta: { updateData },
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={styles.column} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className={styles.row} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className={styles.cell} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
