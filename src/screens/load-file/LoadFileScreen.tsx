import correctPhone from 'helpers/correctPhone';
import hasNumber from 'helpers/hasNumber';
import removeDuplicates from 'helpers/removeDuplicates';
import { ChangeEvent, FC, useState } from 'react';
import { ICounterparty } from 'types/ICounterparty';
import { IGoogleContact } from 'types/IGoogleContact';
import * as XLSX from 'xlsx';
import Button from 'components/ui/button/Button';
import FileUploader from 'components/ui/file-uploader/FileUploader';
import { excel } from 'constants/images';
import Link from 'components/ui/link/Link';
import Converting from 'components/converting/Converting';
import styles from './LoadFileScreen.module.scss';

interface LoadFileScreenProps {
  setContacts: (contacts: IGoogleContact[]) => void;
  setExcludedContacts: (contacts: IGoogleContact[]) => void;
  setScreen: (screen: 'load' | 'completed') => void;
}

const LoadFileScreen: FC<LoadFileScreenProps> = ({
  setContacts,
  setExcludedContacts,
  setScreen,
}) => {
  const [file, setFile] = useState<File>();
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const fileSelectHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const readCounterpartyFile = async () => {
    if (!file) return;
    setIsConverting(true);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const sheetNameList = workbook.SheetNames;
    const counterparties: ICounterparty[] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetNameList[0]],
    );

    const filteredCounterparties = counterparties.filter(
      (counterparty) =>
        counterparty.Архивный === 'нет' ||
        counterparty.Телефон !== '' ||
        counterparty['Тип контрагента'] === 'Физическое лицо',
    );
    counterpartiesToGoogleContacts(filteredCounterparties);
  };

  const counterpartiesToGoogleContacts = (counterparties: ICounterparty[]) => {
    const googleContacts: IGoogleContact[] = [];
    const excludedGoogleContacts: IGoogleContact[] = [];

    for (let i = 0; i < counterparties.length; i++) {
      const counterparty = counterparties[i];

      const phone = correctPhone(counterparty.Телефон);
      const isMobileNumber = phone.slice(1, 2) === '9';

      if (!isMobileNumber || !phone) continue;

      const lastFourNumbers = phone.substring(phone.length - 4);

      const counterpartyName = counterparty.Наименование;
      const counterpartyNameArr = counterpartyName.split(' ');

      const nameLastIndex = counterpartyName.lastIndexOf(' ');
      const surnameAndName =
        counterpartyNameArr.length > 2
          ? counterpartyName.substring(0, nameLastIndex)
          : counterpartyName;

      const name = `${surnameAndName} (${lastFourNumbers})`.replace(
        / +(?= )/g,
        '',
      );

      if (hasNumber(surnameAndName) || name.split(' ').length !== 3) {
        excludedGoogleContacts.push(createGoogleContact(name, phone));
      } else {
        googleContacts.push(createGoogleContact(name, phone));
      }
    }

    const contactsWithoutDuplicates = removeDuplicates(googleContacts);
    const excludedContactsWithoutDuplicates = removeDuplicates(
      excludedGoogleContacts,
    );

    setContacts(contactsWithoutDuplicates);
    setExcludedContacts(excludedContactsWithoutDuplicates);

    setIsConverting(false);
    setScreen('completed');
  };

  const createGoogleContact = (name: string, phone: string) => {
    return {
      Name: name,
      'Given Name': '',
      'Additional Name': '',
      'Family Name': '',
      'Yomi Name': '',
      'Given Name Yomi': '',
      'Additional Name Yomi': '',
      'Family Name Yomi': '',
      'Name Prefix': '',
      'Name Suffix': '',
      Initials: '',
      Nickname: '',
      'Short Name': '',
      'Maiden Name': '',
      Birthday: '',
      Gender: '',
      Location: '',
      'Billing Information': '',
      'Directory Server': '',
      Mileage: '',
      Occupation: '',
      Hobby: '',
      Sensitivity: '',
      Priority: '',
      Subject: '',
      Notes: '',
      Language: '',
      Photo: '',
      'Group Membership': '* myContacts',
      'Phone 1 - Type': 'Mobile',
      'Phone 1 - Value': phone,
    };
  };

  return (
    <div className={styles.container}>
      <Converting isConverting={isConverting} />
      {!isConverting && (
        <>
          <fieldset
            className={[styles.fieldset, styles.file_select_fieldset].join(' ')}
          >
            <legend>Файл с контрагентами</legend>
            <FileUploader
              accept=".xlsx"
              icon={excel}
              onChange={fileSelectHandler}
            />
            {file && (
              <Button variant="primary" onClick={readCounterpartyFile}>
                Конвертировать
              </Button>
            )}
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend>Где взять файл с контрагентами?</legend>
            <ol>
              <li>
                {'Заходим в '}
                <Link href="https://online.moysklad.ru/app">МойСклад</Link>
              </li>
              <li>Контрагенты — Контрагенты</li>
              <li>Экспорт</li>
              <li>
                <Link href="https://online.moysklad.ru/app/#exportimport/showExport">
                  Открываем результаты
                </Link>
              </li>
              <li>Ждем завершения экспорта</li>
              <li>Нажимаем «Скачать файл»</li>
            </ol>
          </fieldset>
        </>
      )}
    </div>
  );
};

export default LoadFileScreen;
