import { IGoogleContact } from 'types/IGoogleContact';

export default function removeDuplicates(googleContacts: IGoogleContact[]) {
  return googleContacts.filter(
    (googleContact, index, self) =>
      self.findIndex((t) => {
        return t['Phone 1 - Value'] === googleContact['Phone 1 - Value'];
      }) === index,
  );
}
