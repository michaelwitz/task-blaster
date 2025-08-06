import { Grid, Paper, Stack, Text, Badge, Box, Group } from '@mantine/core';
import { useTranslation } from '../hooks/useTranslation.js';
import { TaskCard } from './TaskCard.jsx';

export function KanbanColumn({ status, tasks, onTaskClick }) {
  const { t, translateStatus } = useTranslation();

  return (
    <Grid.Col span={3} style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)' }}>
      {/* Column title - outside the scrollable area */}
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
        <Group gap="xs" align="center">
          <Text fw={600} size="lg">
            {translateStatus(status)}
          </Text>
          <Badge size="sm" variant="light">
            {tasks.length}
          </Badge>
        </Group>
      </Box>
      
      {/* Column content - scrollable */}
      <Paper p="md" withBorder style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box style={{ flex: 1, overflowY: 'auto' }}>
          {tasks.length === 0 ? (
            <Box style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flex: 1,
              border: '2px dashed #ccc',
              borderRadius: '8px',
              margin: '8px 0'
            }}>
              <Text size="sm" c="dimmed" ta="center">
                {t('kanban.noTasksInColumn')}
              </Text>
            </Box>
          ) : (
            <Stack gap="xs">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onClick={onTaskClick} />
              ))}
            </Stack>
          )}
        </Box>
      </Paper>
    </Grid.Col>
  );
} 