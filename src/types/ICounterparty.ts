export interface ICounterparty {
  Наименование: string;
  Телефон: string;
  'Тип контрагента':
    | 'Физическое лицо'
    | 'Юридическое лицо'
    | 'Индивидуальный предприниматель';
  Архивный: 'да' | 'нет';
}