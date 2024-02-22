import { Column, Row, Table } from '@tanstack/react-table';
import { FC, useState } from 'react';
import { IGoogleContact } from 'types/IGoogleContact';
import styles from './NameCell.module.scss';

interface NameCellProps {
  row: Row<IGoogleContact>;
  column: Column<IGoogleContact>;
  table: Table<IGoogleContact>;
}

const NameCell: FC<NameCellProps> = ({ row, column, table }) => {
  const [name, setName] = useState<string>(row.original.Name);

  const blurHandler = () => {
    if (row.original.Name === name) return;
    //@ts-ignore
    table.options.meta?.updateData(row.index, column.id, name);
  };

  return (
    <input
      className={styles.input}
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={blurHandler}
    />
  );
};

export default NameCell;
