import { FC } from 'react';
import { IGoogleContact } from 'types/IGoogleContact';
import Table from 'components/ui/table/Table';
import { googleContactsTableColumns } from './GoogleContactsTable.columns';
import useSkipper from 'hooks/useSkipper';
import createClone from 'helpers/createClone';
import { RowSelectionState } from '@tanstack/react-table';
import { emptycontacts } from 'constants/images';
import Link from 'components/ui/link/Link';
import styles from './GoogleContactsTable.module.scss';

interface GoogleContactsTableProps {
  googleContacts: IGoogleContact[];
  setGoogleContacts: (googleContacts: IGoogleContact[]) => void;
  rowSelection: RowSelectionState;
  onRowSelect: (state: RowSelectionState) => void;
}

const GoogleContactsTable: FC<GoogleContactsTableProps> = ({
  googleContacts,
  setGoogleContacts,
  rowSelection,
  onRowSelect,
}) => {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const updateData = (rowIndex: number, _columnId: string, value: any) => {
    skipAutoResetPageIndex();

    const googleContactsClone = createClone(googleContacts);
    googleContactsClone[rowIndex].Name = value;
    setGoogleContacts(googleContactsClone);
  };

  return googleContacts.length > 0 ? (
    <Table
      data={googleContacts}
      columns={googleContactsTableColumns}
      updateData={updateData}
      autoResetPageIndex={autoResetPageIndex}
      enableRowSelection
      selectedRowKey="Phone 1 - Value"
      rowSelection={rowSelection}
      onRowSelect={onRowSelect}
    />
  ) : (
    <div className={styles.container}>
      <img className={styles.image} src={emptycontacts} />
      <div>
        <div className={styles.text}>Все контрагенты конвертированы</div>
        <div className={styles.text}>
          {`Сохраните файл и `}
          <Link href="https://contacts.google.com/">импортируйте</Link>
          {` его в Google Контакты`}
        </div>
      </div>
    </div>
  );
};

export default GoogleContactsTable;
