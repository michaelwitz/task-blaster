import { Modal, TextInput, Button, Stack } from '@mantine/core';
import { useState } from 'react';

export function TokenModal({ opened, onClose, onSetToken }) {
  const [token, setToken] = useState('');

  const handleSetToken = () => {
    console.log('TokenModal handleSetToken called with:', token);
    if (token.trim()) {
      onSetToken(token.trim());
      setToken(''); // Clear input after setting
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSetToken();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Set Access Token" centered>
      <Stack>
        <TextInput
          label="Access Token"
          placeholder="Enter your access token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
        <Button onClick={handleSetToken} fullWidth>
          Set Token
        </Button>
      </Stack>
    </Modal>
  );
} 