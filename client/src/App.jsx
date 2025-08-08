import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
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
  IconPlus,
  IconArrowLeft
} from '@tabler/icons-react';
import { TokenModal } from './components/TokenModal.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { KanbanPage } from './pages/KanbanPage.jsx';
import { useTranslation } from './hooks/useTranslation.js';
import '@mantine/core/styles.css';

function AppContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract projectCode from URL manually since useParams only works inside route components
  const projectCode = location.pathname.startsWith('/projects/') && location.pathname.includes('/kanban')
    ? location.pathname.split('/')[2] 
    : null;
  
  const [colorScheme, setColorScheme] = useState('dark');
  const [accessToken, setAccessToken] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [createTaskModalOpened, setCreateTaskModalOpened] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    prompt: '',
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
    navigate(`/projects/${project.code}/kanban`);
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
    
    // Convert tag strings to tag objects with colors
    const tagColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'];
    const tagsWithColors = newTask.tags.map((tagName, index) => ({
      name: tagName,
      color: tagColors[index % tagColors.length]
    }));
    
    console.log('Tags with colors:', tagsWithColors);
    
    setNewTask({
      title: '',
      prompt: '',
      priority: 'MEDIUM',
      assigneeId: null,
      storyPoints: null,
      tags: []
    });
  };

  // Load project from URL if projectCode is present
  useEffect(() => {
    if (projectCode) {
      if (projects.length > 0) {
        const project = projects.find(p => p.code === projectCode);
        if (project) {
          setSelectedProject(project);
        } else {
          // Project not found, redirect to home
          navigate('/');
        }
      }
      // If projects aren't loaded yet, we'll wait for them to load
      // The useEffect will run again when projects are loaded
    }
  }, [projectCode, projects, navigate]);

  // Keyboard shortcut for creating new task (Ctrl/Cmd + N)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'n' && location.pathname.includes('/kanban')) {
        event.preventDefault();
        setCreateTaskModalOpened(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [location.pathname]);

  const handleBackToProjects = () => {
    setSelectedProject(null);
    navigate('/projects');
  };

  const theme = createTheme({
    // You can customize theme here if needed
  });

  // Determine current page from location
  const isKanbanPage = location.pathname.includes('/kanban');

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme={colorScheme}>
      <AppShell padding={0}>
        {/* Header with hamburger menu and theme toggle */}
        <AppShell.Header p="md">
          <Flex justify="space-between" align="center" style={{ position: 'relative' }}>
            <Group style={{ flexShrink: 0 }}>
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
                  
                  {isKanbanPage && (
                    <>
                      <Menu.Divider />
                      <Menu.Label>{t('kanban.title')}</Menu.Label>
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
              
              {isKanbanPage && (
                <Button 
                  variant="subtle" 
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={handleBackToProjects}
                  size="sm"
                >
                  {t('common.back')}
                </Button>
              )}
            </Group>
            
            {/* Project title in center - responsive layout */}
            {isKanbanPage && selectedProject && (
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: 'calc(100% - 400px)', // Leave space for left and right groups
                overflow: 'hidden',
                textAlign: 'center',
                pointerEvents: 'none'
              }}>
                <Text 
                  size="xl" 
                  fw={600} 
                  c="blue.4"
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                  title={selectedProject.title} // Show full title on hover
                >
                  {selectedProject.title}
                </Text>
              </div>
            )}
            
            <Group style={{ flexShrink: 0 }}>
              <IconDashboard size={24} stroke={1.5} />
              <Text size="lg" fw={700}>Task Blaster</Text>
              <ActionIcon 
                onClick={toggleTheme}
                variant="subtle"
                size="lg"
                aria-label="Toggle theme"
              >
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Group>
          </Flex>
        </AppShell.Header>

        {/* Main content */}
        <AppShell.Main pt="md">
          <Routes>
            <Route path="/" element={
              <Navigate to="/projects" replace />
            } />
            <Route path="/projects" element={
              <HomePage 
                projects={projects}
                loading={loading}
                accessToken={accessToken}
                onProjectSelect={handleProjectSelect}
                onProjectEdit={handleProjectEdit}
              />
            } />
            <Route path="/projects/:projectCode/kanban" element={
              <KanbanPage 
                selectedProject={selectedProject}
                onBackToProjects={handleBackToProjects}
              />
            } />
          </Routes>
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
                          label={t('tasks.prompt')}
                          placeholder={t('tasks.prompt')}
                          value={newTask.prompt}
                          onChange={(e) => setNewTask({ ...newTask, prompt: e.target.value })}
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
            label="Tags"
            placeholder="Tags"
            data={[
              { value: 'setup', label: 'setup' },
              { value: 'configuration', label: 'configuration' },
              { value: 'database', label: 'database' },
              { value: 'design', label: 'design' },
              { value: 'auth', label: 'auth' },
              { value: 'security', label: 'security' },
              { value: 'documentation', label: 'documentation' },
              { value: 'api', label: 'api' }
            ]}
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
        <div>URL: {location.pathname}</div>
        <div>isKanbanPage: {isKanbanPage ? 'true' : 'false'}</div>
        <div>selectedProject: {selectedProject ? selectedProject.title : 'null'}</div>
        <div>projectCode: {projectCode || 'null'}</div>
      </div>
    </MantineProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
