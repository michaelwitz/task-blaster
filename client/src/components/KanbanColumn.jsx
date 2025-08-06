import { Grid, Paper, Stack, Text, Badge, Box } from '@mantine/core';
import { useTranslation } from '../hooks/useTranslation.js';
import { TaskCard } from './TaskCard.jsx';

export function KanbanColumn({ status, tasks }) {
  const { t, translateStatus } = useTranslation();

  return (
    <Grid.Col span={3}>
      <Paper p="md" withBorder h="100%">
        <Stack gap="md" h="100%">
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text fw={600} size="lg">
              {translateStatus(status)}
            </Text>
            <Badge size="sm" variant="light">
              {tasks.length}
            </Badge>
          </Box>
          
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
} 