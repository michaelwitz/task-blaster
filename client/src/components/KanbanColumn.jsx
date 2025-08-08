import { Grid, Paper, Stack, Text, Badge, Box, Group } from '@mantine/core';
import { useTranslation } from '../hooks/useTranslation.js';
import { TaskCard } from './TaskCard.jsx';

export function KanbanColumn({ status, tasks, onTaskEdit, onTaskMove }) {
  const { t, translateStatus } = useTranslation();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    const task = tasks.find(t => t.id === taskId);
    
    if (task && task.status !== status) {
      onTaskMove(taskId, status);
    }
  };

  return (
    <Grid.Col span={3} style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)' }}>
      {/* Column title */}
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
      
      {/* Column content */}
      <Paper 
        p="md" 
        withBorder 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column'
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Box 
          style={{ 
            flex: 1, 
            overflowY: 'auto',
            padding: '8px'
          }}
        >
          {tasks.length === 0 ? (
            <Box style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flex: 1,
              border: '2px dashed #ccc',
              borderRadius: '8px',
              margin: '8px 0',
              minHeight: '100px'
            }}>
              <Text size="sm" c="dimmed" ta="center">
                {t('kanban.noTasksInColumn')}
              </Text>
            </Box>
          ) : (
            <Stack gap="xs">
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={onTaskEdit}
                  onMove={onTaskMove}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Paper>
    </Grid.Col>
  );
} 