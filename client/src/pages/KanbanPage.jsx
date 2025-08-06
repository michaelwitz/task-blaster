import { Container, Text, Button, Grid } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTasks } from '../hooks/useTasks.js';
import { KanbanColumn } from '../components/KanbanColumn.jsx';

export function KanbanPage({ selectedProject, onBackToProjects }) {
  const { t } = useTranslation();
  const { 
    tasks, 
    loading, 
    taskStatuses, 
    getTasksByStatus 
  } = useTasks(selectedProject);

  if (loading) {
    return (
      <Container size="xl" py="xl" mt="md">
        <Text>{t('common.loading')}</Text>
      </Container>
    );
  }

      return (
      <Container size="xl" py="xl" mt="md">
        {/* Back button */}
        <Button 
          variant="subtle" 
          leftSection={<IconArrowLeft size={16} />}
          onClick={onBackToProjects}
          mb="lg"
        >
          {t('common.back')}
        </Button>
      
              {/* Kanban board */}
        <Grid gutter="xs">
          {taskStatuses.map(status => (
            <KanbanColumn 
              key={status} 
              status={status} 
              tasks={getTasksByStatus(status)} 
            />
          ))}
        </Grid>
      </Container>
    );
  } 