import { useState, useEffect } from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Grid, 
  Paper, 
  Stack,
  ActionIcon,
  Menu,
  Modal,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  MultiSelect,
  Badge,
  Card,
  Flex,
  Box
} from '@mantine/core';
import { 
  IconArrowLeft, 
  IconMenu2, 
  IconPlus, 
  IconX,
  IconUser,
  IconTag,
  IconFlag,
  IconCalendar
} from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';

export function KanbanPage({ selectedProject, onBackToProjects }) {
  const { t, translateStatus, translatePriority } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createTaskModalOpened, setCreateTaskModalOpened] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    assigneeId: null,
    storyPoints: null,
    tags: []
  });

  // Task statuses in order for columns
  const taskStatuses = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

  // Keyboard shortcut for creating new task (Ctrl/Cmd + N)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        setCreateTaskModalOpened(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mock tasks data - this will be replaced with API calls
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Set up project structure',
          description: 'Initialize the basic project structure and configuration',
          status: 'TO_DO',
          priority: 'HIGH',
          assigneeName: 'John Doe',
          storyPoints: 3,
          tags: ['setup', 'configuration'],
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          title: 'Design database schema',
          description: 'Create the database schema and relationships',
          status: 'IN_PROGRESS',
          priority: 'CRITICAL',
          assigneeName: 'Jane Smith',
          storyPoints: 5,
          tags: ['database', 'design'],
          createdAt: '2024-01-14'
        },
        {
          id: 3,
          title: 'Implement authentication',
          description: 'Add user authentication and authorization',
          status: 'IN_REVIEW',
          priority: 'HIGH',
          assigneeName: 'Mike Johnson',
          storyPoints: 4,
          tags: ['auth', 'security'],
          createdAt: '2024-01-13'
        },
        {
          id: 4,
          title: 'Create API documentation',
          description: 'Document all API endpoints and usage',
          status: 'DONE',
          priority: 'MEDIUM',
          assigneeName: 'Sarah Wilson',
          storyPoints: 2,
          tags: ['documentation', 'api'],
          createdAt: '2024-01-12'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [selectedProject]);

  const handleCreateTask = () => {
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

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'blue';
      case 'LOW': return 'green';
      default: return 'gray';
    }
  };

  const TaskCard = ({ task }) => (
    <Card shadow="sm" padding="sm" mb="xs" withBorder>
      <Stack gap="xs">
        <Text size="sm" fw={500} lineClamp={2}>
          {task.title}
        </Text>
        
        {task.description && (
          <Text size="xs" c="dimmed" lineClamp={2}>
            {task.description}
          </Text>
        )}
        
        <Flex gap="xs" wrap="wrap">
          <Badge size="xs" color={getPriorityColor(task.priority)}>
            {translatePriority(task.priority)}
          </Badge>
          
          {task.storyPoints && (
            <Badge size="xs" variant="outline">
              {task.storyPoints} SP
            </Badge>
          )}
        </Flex>
        
        {task.assigneeName && (
          <Group gap="xs">
            <IconUser size={12} />
            <Text size="xs">{task.assigneeName}</Text>
          </Group>
        )}
        
        {task.tags && task.tags.length > 0 && (
          <Group gap="xs">
            <IconTag size={12} />
            <Text size="xs" c="dimmed">
              {task.tags.slice(0, 2).join(', ')}
              {task.tags.length > 2 && ` +${task.tags.length - 2}`}
            </Text>
          </Group>
        )}
        
        <Group gap="xs">
          <IconCalendar size={12} />
          <Text size="xs" c="dimmed">
            {new Date(task.createdAt).toLocaleDateString()}
          </Text>
        </Group>
      </Stack>
    </Card>
  );

  const KanbanColumn = ({ status, tasks }) => (
    <Grid.Col span={3}>
      <Paper p="md" withBorder h="100%">
        <Stack gap="md" h="100%">
          <Group justify="space-between">
            <Text fw={600} size="lg">
              {translateStatus(status)}
            </Text>
            <Badge size="sm" variant="light">
              {tasks.length}
            </Badge>
          </Group>
          
          <Box style={{ flex: 1, minHeight: '400px' }}>
            {tasks.length === 0 ? (
              <Text size="sm" c="dimmed" ta="center" py="xl">
                {t('kanban.noTasksInColumn')}
              </Text>
            ) : (
              <Stack gap="xs">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </Paper>
    </Grid.Col>
  );

  if (loading) {
    return (
      <Container size="xl" py="xl" mt="md">
        <Text>{t('common.loading')}</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl" mt="md">
      {/* Header with back button and hamburger menu */}
      <Group mb="lg" justify="space-between">
        <Group>
          <Button 
            variant="subtle" 
            leftSection={<IconArrowLeft size={16} />}
            onClick={onBackToProjects}
          >
            {t('common.back')}
          </Button>
        </Group>
        
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" size="lg">
              <IconMenu2 size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{t('common.actions')}</Menu.Label>
            <Menu.Item 
              leftSection={<IconPlus size={14} />}
              onClick={() => setCreateTaskModalOpened(true)}
            >
              {t('tasks.createTask')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      
      {/* Project title */}
      <Title order={1} mb="lg">
        {selectedProject?.title} - {t('kanban.title')}
      </Title>
      
      {/* Keyboard shortcut hint */}
      <Text size="sm" c="dimmed" mb="xl">
        {t('common.keyboardShortcut')}: Ctrl+N / Cmd+N {t('tasks.createTask')}
      </Text>
      
      {/* Kanban board */}
      <Grid gutter="md">
        {taskStatuses.map(status => (
          <KanbanColumn 
            key={status} 
            status={status} 
            tasks={getTasksByStatus(status)} 
          />
        ))}
      </Grid>

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
              { value: 'LOW', label: translatePriority('LOW') },
              { value: 'MEDIUM', label: translatePriority('MEDIUM') },
              { value: 'HIGH', label: translatePriority('HIGH') },
              { value: 'CRITICAL', label: translatePriority('CRITICAL') }
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
            <Button onClick={handleCreateTask}>
              {t('tasks.createTask')}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
} 