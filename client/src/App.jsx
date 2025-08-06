import { useState, useEffect } from 'react';
import { 
  MantineProvider, 
  AppShell, 
  ActionIcon, 
  Text, 
  Group, 
  Flex, 
  Menu,
  Modal, 
  TextInput, 
  Textarea, 
  Select, 
  NumberInput, 
  MultiSelect, 
  Button, 
  Stack
} from '@mantine/core';
import { createTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSun, 
  IconMoon, 
  IconDashboard, 
  IconMenu2, 
  IconKey,
  IconPlus
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
  const [createTaskModalOpened, setCreateTaskModalOpened] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    assigneeId: null,
    storyPoints: null,
    tags: []
  });

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
    console.log('App handleProjectSelect called with:', project);
    setSelectedProject(project);
    setCurrentPage('kanban');
    console.log('Current page set to:', 'kanban');
  };

  const handleProjectEdit = (project) => {
    console.log('App handleProjectEdit called with:', project);
    // TODO: Implement project editing in a separate feature branch
    alert(`Edit project: ${project.title}`);
  };

  const handleCreateTask = () => {
    setCreateTaskModalOpened(true);
  };

  const handleCreateTaskSubmit = () => {
    // This will be implemented in the next feature branch
    console.log('Creating task:', newTask);
    setCreateTaskModalOpened(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'MEDIUM',
      assigneeId: null,
      storyPoints: null,
      tags: []
    });
  };

  // Keyboard shortcut for creating new task (Ctrl/Cmd + N)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'n' && currentPage === 'kanban') {
        event.preventDefault();
        setCreateTaskModalOpened(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setCurrentPage('home');
  };

  const theme = createTheme({
    // You can customize theme here if needed
  });

  // Render current page
  const renderCurrentPage = () => {
    console.log('renderCurrentPage called, currentPage:', currentPage, 'selectedProject:', selectedProject);
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
        onProjectEdit={handleProjectEdit}
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
                  
                  {currentPage === 'kanban' && (
                    <>
                      <Menu.Divider />
                      <Menu.Label>{t('tasks.title')}</Menu.Label>
                      <Menu.Item 
                        leftSection={<IconPlus size={14} />}
                        onClick={handleCreateTask}
                        title={`${t('common.keyboardShortcut')}: Ctrl+N / Cmd+N`}
                      >
                        {t('tasks.createTask')}
                      </Menu.Item>
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>
              
              <IconDashboard size={24} stroke={1.5} />
              <Text size="lg" fw={700}>
                {currentPage === 'kanban' && selectedProject ? selectedProject.title : 'Task Blaster'}
              </Text>
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

      {/* Create Task Modal */}
      <Modal 
        opened={createTaskModalOpened} 
        onClose={() => setCreateTaskModalOpened(false)}
        title={t('tasks.createTask')}
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label={t('tasks.title')}
            placeholder={t('tasks.title')}
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          
          <Textarea
            label={t('tasks.description')}
            placeholder={t('tasks.description')}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            rows={3}
          />
          
          <Select
            label={t('tasks.priority')}
            data={[
              { value: 'LOW', label: t('tasks.priorities.LOW') },
              { value: 'MEDIUM', label: t('tasks.priorities.MEDIUM') },
              { value: 'HIGH', label: t('tasks.priorities.HIGH') },
              { value: 'CRITICAL', label: t('tasks.priorities.CRITICAL') }
            ]}
            value={newTask.priority}
            onChange={(value) => setNewTask({ ...newTask, priority: value })}
          />
          
          <NumberInput
            label={t('tasks.storyPoints')}
            placeholder={t('tasks.storyPoints')}
            value={newTask.storyPoints}
            onChange={(value) => setNewTask({ ...newTask, storyPoints: value })}
            min={1}
            max={21}
          />
          
          <MultiSelect
            label={t('tasks.tags')}
            placeholder={t('tasks.tags')}
            data={['setup', 'configuration', 'database', 'design', 'auth', 'security', 'documentation', 'api']}
            value={newTask.tags}
            onChange={(value) => setNewTask({ ...newTask, tags: value })}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => query}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => setCreateTaskModalOpened(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleCreateTaskSubmit}>
              {t('tasks.createTask')}
            </Button>
          </Group>
        </Stack>
      </Modal>

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
