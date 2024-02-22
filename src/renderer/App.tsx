import { useState } from 'react';
import { IGoogleContact } from 'types/IGoogleContact';
import LoadFileScreen from 'screens/load-file/LoadFileScreen';
import CompletedScreen from 'screens/completed/CompletedScreen';
import './App.css';

export default function App() {
  const [contacts, setContacts] = useState<IGoogleContact[]>([]);
  const [excludedContacts, setExcludedContacts] = useState<IGoogleContact[]>(
    [],
  );
  const [screen, setScreen] = useState<'load' | 'completed'>('load');

  const renderScreen = () => {
    switch (screen) {
      case 'completed':
        return (
          <CompletedScreen
            contacts={contacts}
            setContacts={setContacts}
            excludedContacts={excludedContacts}
            setExcludedContacts={setExcludedContacts}
            setScreen={setScreen}
          />
        );
      default:
        return (
          <LoadFileScreen
            setContacts={setContacts}
            setExcludedContacts={setExcludedContacts}
            setScreen={setScreen}
          />
        );
    }
  };

  return renderScreen();
}
