import { useState, useEffect } from 'react';
import { 
  MantineProvider, 
  AppShell, 
  ActionIcon, 
  Text, 
  Group, 
  Flex, 
  Menu
} from '@mantine/core';
import { createTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSun, 
  IconMoon, 
  IconDashboard, 
  IconMenu2, 
  IconKey
} from '@tabler/icons-react';
import { TokenModal } from './components/TokenModal.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { KanbanPage } from './pages/KanbanPage.jsx';
import { useTranslation } from './hooks/useTranslation.js';
import '@mantine/core/styles.css';

function App() {
  const { t } = useTranslation();
  const [colorScheme, setColorScheme] = useState('dark');
  const [accessToken, setAccessToken] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'kanban'
  const [opened, { open, close }] = useDisclosure(false);

  // Fetch projects with a specific token
  const fetchProjectsWithToken = async (token) => {
    console.log('fetchProjectsWithToken called with:', token);
    if (!token) return;

    setLoading(true);
    try {
      console.log('Fetching projects from API...');
      const response = await fetch('http://localhost:3030/projects', {
        method: 'GET',
        headers: {
          'TB_TOKEN': token,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API response status:', response.status);
      console.log('API response headers:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Projects fetched:', data);
        setProjects(data);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch projects:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setColorScheme(savedTheme);
    }

    // Check for saved access token
    const savedToken = localStorage.getItem('TB_TOKEN');
    if (savedToken) {
      setAccessToken(savedToken);
      // Auto-load projects if token exists
      fetchProjectsWithToken(savedToken);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSetToken = (token) => {
    console.log('App handleSetToken called with:', token);
    setAccessToken(token);
    localStorage.setItem('TB_TOKEN', token);
    console.log('Token saved to localStorage');
    close();
    console.log('Modal closed, fetching projects...');
    // Auto-load projects after setting token
    fetchProjectsWithToken(token);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentPage('kanban');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setCurrentPage('home');
  };

  const theme = createTheme({
    // You can customize theme here if needed
  });

  // Render current page
  const renderCurrentPage = () => {
    if (currentPage === 'kanban') {
      return (
        <KanbanPage 
          selectedProject={selectedProject}
          onBackToProjects={handleBackToProjects}
        />
      );
    }
    
    return (
      <HomePage 
        projects={projects}
        loading={loading}
        accessToken={accessToken}
        onProjectSelect={handleProjectSelect}
      />
    );
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme={colorScheme}>
      <AppShell padding="md">
        {/* Header with hamburger menu and theme toggle */}
        <AppShell.Header p="md">
          <Flex justify="space-between" align="center">
            <Group>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="subtle" size="lg">
                    <IconMenu2 size={20} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>{t('common.settings')}</Menu.Label>
                  <Menu.Item 
                    leftSection={<IconKey size={14} />}
                    onClick={open}
                  >
                    {t('common.setAccessToken')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              
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
          {renderCurrentPage()}
        </AppShell.Main>
      </AppShell>

      {/* Token Modal */}
      <TokenModal 
        opened={opened} 
        onClose={close} 
        onSetToken={handleSetToken} 
      />

      {/* Debug info - remove in production */}
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px', 
        fontSize: '12px',
        maxWidth: '300px'
      }}>
        <div>Token: {accessToken ? 'Set' : 'Not set'}</div>
        <div>localStorage: {localStorage.getItem('TB_TOKEN') ? 'Has token' : 'No token'}</div>
        <div>Projects: {projects.length}</div>
        <div>Page: {currentPage}</div>
      </div>
    </MantineProvider>
  );
}

export default App;
