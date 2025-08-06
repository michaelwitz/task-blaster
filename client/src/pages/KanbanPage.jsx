import { Container, Text, Button, Grid, Modal, Stack, Badge, Group } from '@mantine/core';
import { IconArrowLeft, IconUser, IconCalendar } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTasks } from '../hooks/useTasks.js';
import { KanbanColumn } from '../components/KanbanColumn.jsx';
import { useState } from 'react';

export function KanbanPage({ selectedProject, onBackToProjects }) {
  const { t, translatePriority } = useTranslation();
  const { 
    tasks, 
    loading, 
    taskStatuses, 
    getTasksByStatus 
  } = useTasks(selectedProject);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetailModalOpened, setTaskDetailModalOpened] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDetailModalOpened(true);
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

  if (loading) {
    return (
      <Container size="xl" py="xl" mt="md">
        <Text>{t('common.loading')}</Text>
      </Container>
    );
  }

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '16px', paddingTop: '80px' }}>
        {/* Kanban board - fills available space */}
        <Grid gutter="xs" style={{ flex: 1, minHeight: 'calc(100vh - 120px)' }}>
          {taskStatuses.map(status => (
            <KanbanColumn 
              key={status} 
              status={status} 
              tasks={getTasksByStatus(status)} 
              onTaskClick={handleTaskClick}
            />
          ))}
        </Grid>
      </div>

      {/* Task Detail Modal */}
      <Modal 
        opened={taskDetailModalOpened} 
        onClose={() => setTaskDetailModalOpened(false)}
        title={selectedTask?.title}
        size="lg"
      >
        {selectedTask && (
          <Stack gap="md">
            {selectedTask.prompt && (
              <div>
                <Text size="sm" fw={500} mb="xs">{t('tasks.prompt')}</Text>
                <Text size="sm" c="dimmed">{selectedTask.prompt}</Text>
              </div>
            )}
            
            <Group gap="xs">
              <Badge size="sm" color={getPriorityColor(selectedTask.priority)}>
                {translatePriority(selectedTask.priority)}
              </Badge>
              
              {selectedTask.storyPoints && (
                <Badge size="sm" variant="outline">
                  {selectedTask.storyPoints} SP
                </Badge>
              )}
            </Group>
            
            {selectedTask.assigneeName && (
              <Group gap="xs">
                <IconUser size={16} />
                <Text size="sm">{selectedTask.assigneeName}</Text>
              </Group>
            )}
            
            {selectedTask.tags && selectedTask.tags.length > 0 && (
              <Group gap="xs">
                {selectedTask.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    size="sm" 
                    style={{ 
                      backgroundColor: tag.color,
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </Group>
            )}
            
            <Group gap="xs">
              <IconCalendar size={16} />
              <Text size="sm" c="dimmed">
                Created: {new Date(selectedTask.createdAt).toLocaleDateString()} {new Date(selectedTask.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
} 