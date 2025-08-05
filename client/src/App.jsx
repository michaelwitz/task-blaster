import { MantineProvider, Container, Title, Text, Button, Group, Paper, Stack, AppShell, ActionIcon, Flex, createTheme } from '@mantine/core';
import { IconSun, IconMoon, IconDashboard } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import '@mantine/core/styles.css';

function App() {
  const [colorScheme, setColorScheme] = useState('dark'); // Default to dark mode

  useEffect(() => {
    // Check for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setColorScheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const theme = createTheme({
    // You can customize theme here if needed
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme={colorScheme}>
      <AppShell padding="md">
        {/* Header with theme toggle in top right */}
        <AppShell.Header p="md">
          <Flex justify="space-between" align="center">
            <Group>
              <IconDashboard size={24} stroke={1.5} />
              <Text size="lg" fw={700}>Task Blaster</Text>
            </Group>
            
            <ActionIcon 
              onClick={toggleTheme}
              variant="subtle"
              size="lg"
              aria-label="Toggle theme"
            >
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Flex>
        </AppShell.Header>

        {/* Main content */}
        <AppShell.Main>
          <Container size="lg" py="xl">
            <Stack align="center" gap="xl">
              <Paper shadow="sm" p="xl" radius="md" w="100%" maw={600}>
                <Stack align="center" gap="md">
                  <IconDashboard size={48} stroke={1.5} />
                  <Title order={1} ta="center">Hello World!</Title>
                  <Text size="lg" ta="center" c="dimmed">
                    Kanban Project Management Platform
                  </Text>
                  <Text size="sm" ta="center">
                    Modern React SPA built with Vite + Mantine + JavaScript
                  </Text>
                  
                  <Group justify="center" gap="md" mt="md">
                    <Button variant="filled" size="md">
                      Get Started
                    </Button>
                    <Button variant="light" size="md">
                      View Projects
                    </Button>
                  </Group>
                  
                  <Paper bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'} p="md" radius="sm" w="100%" mt="lg">
                    <Text size="xs" ta="center" c="dimmed">
                      ✅ Vite + React (JavaScript) • ✅ Mantine UI • ✅ Dark Theme Default • ✅ Ready for Kanban
                    </Text>
                  </Paper>
                </Stack>
              </Paper>
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
