import GoogleContactsTable from 'components/google-contacts-table/GoogleContactsTable';
import Button from 'components/ui/button/Button';
import { FC, useState } from 'react';
import { IGoogleContact } from 'types/IGoogleContact';
import { RowSelectionState } from '@tanstack/react-table';
import createClone from 'helpers/createClone';
import * as XLSX from 'xlsx';
import styles from './CompletedScreen.module.scss';

interface CompletedScreenProps {
  contacts: IGoogleContact[];
  excludedContacts: IGoogleContact[];
  setContacts: (contacts: IGoogleContact[]) => void;
  setExcludedContacts: (contacts: IGoogleContact[]) => void;
  setScreen: (screen: 'load' | 'completed') => void;
}

const CompletedScreen: FC<CompletedScreenProps> = ({
  contacts,
  excludedContacts,
  setContacts,
  setExcludedContacts,
  setScreen,
}) => {
  const [selectedGoogleContacts, setSelectedGoogleContacts] =
    useState<RowSelectionState>({});

  const selectedCount = Object.keys(selectedGoogleContacts).length;

  const back = () => {
    setContacts([]);
    setExcludedContacts([]);
    setScreen('load');
  };

  const save = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `google-contacts ${today}.csv`, {
      bookType: 'csv',
    });
  };

  const include = () => {
    let includedContatcs = [];
    let excludedContactsClone = createClone(excludedContacts);
    const phones = Object.keys(selectedGoogleContacts);

    includedContatcs = excludedContactsClone.filter((x) =>
      phones.includes(x['Phone 1 - Value']),
    );
    excludedContactsClone = excludedContactsClone.filter(
      (x) => !phones.includes(x['Phone 1 - Value']),
    );

    setContacts([...contacts, ...includedContatcs]);
    setExcludedContacts(excludedContactsClone);
    setSelectedGoogleContacts({});
  };

  const importContacts = () => {
    window.open('https://contacts.google.com/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={back}>Назад</Button>
        <div>
          <div>{`Конвертировано ${contacts.length}/${contacts.length + excludedContacts.length}`}</div>
          {excludedContacts.length > 0 && (
            <div
              className={styles.excluded_text}
            >{`Исключено ${excludedContacts.length}`}</div>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <GoogleContactsTable
          googleContacts={excludedContacts}
          setGoogleContacts={setExcludedContacts}
          rowSelection={selectedGoogleContacts}
          onRowSelect={setSelectedGoogleContacts}
        />
      </div>
      <div className={styles.footer}>
        <div>
          <Button
            variant="primary"
            style={{ marginRight: '8px' }}
            onClick={save}
          >
            Сохранить файл
          </Button>
          <Button disabled={selectedCount === 0} onClick={include}>
            {`Включить в файл выбранное: ${selectedCount}`}
          </Button>
        </div>
        <Button onClick={importContacts}>Импортировать</Button>
      </div>
    </div>
  );
};

export default CompletedScreen;
