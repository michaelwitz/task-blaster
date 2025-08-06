import { Card, Stack, Text, Flex, Badge, Group } from '@mantine/core';
import { IconUser, IconCalendar } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';

export function TaskCard({ task, onClick }) {
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
    <Card 
      shadow="sm" 
      padding="sm" 
      mb="xs" 
      withBorder
      style={{ cursor: 'pointer' }}
      onClick={() => onClick && onClick(task)}
    >
      <Stack gap="xs">
        <Text size="sm" fw={500} lineClamp={2}>
          {task.title}
        </Text>
        
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
            {task.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                size="xs" 
                style={{ 
                  backgroundColor: tag.color,
                  color: 'white',
                  border: 'none'
                }}
              >
                {tag.name}
              </Badge>
            ))}
            {task.tags.length > 3 && (
              <Badge size="xs" variant="outline">
                +{task.tags.length - 3}
              </Badge>
            )}
          </Group>
        )}
        
        <Group gap="xs">
          <IconCalendar size={12} />
          <Text size="xs" c="dimmed">
            Created: {new Date(task.createdAt).toLocaleDateString()} {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
} 