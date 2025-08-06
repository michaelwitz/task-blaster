import { Card, Stack, Text, Flex, Badge, Group } from '@mantine/core';
import { IconUser, IconTag, IconCalendar } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';

export function TaskCard({ task }) {
  const { translatePriority } = useTranslation();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'blue';
      case 'LOW': return 'green';
      default: return 'gray';
    }
  };

  return (
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
} 