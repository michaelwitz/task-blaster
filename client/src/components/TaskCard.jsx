import { Card, Stack, Text, Flex, Badge, Group, Box } from '@mantine/core';
import { IconUser, IconCalendar, IconFlame, IconArrowUp, IconSquare, IconArrowDown } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';

export function TaskCard({ task, onClick }) {
  const { translatePriority } = useTranslation();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'yellow';
      case 'LOW': return 'blue';
      default: return 'gray';
    }
  };

  const getPriorityIcon = (priority) => {
    const color = getPriorityColor(priority);
    const iconProps = { size: 16, style: { color } };
    
    switch (priority) {
      case 'CRITICAL': return <IconFlame {...iconProps} style={{ color: '#ff4757' }} />; // Red flame
      case 'HIGH': return <IconArrowUp {...iconProps} style={{ color: '#ff4757' }} />; // Red up arrow
      case 'MEDIUM': return <IconSquare {...iconProps} style={{ color: '#ffa502' }} />; // Yellow square
      case 'LOW': return <IconArrowDown {...iconProps} style={{ color: '#3742fa' }} />; // Blue down arrow
      default: return <IconSquare {...iconProps} style={{ color: '#747d8c' }} />; // Gray square
    }
  };

  return (
    <Card 
      shadow="sm" 
      padding="sm" 
      mb="xs" 
      withBorder
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={() => onClick && onClick(task)}
    >
      {/* Priority icon in top right corner */}
      <Box
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1
        }}
        title={translatePriority(task.priority)} // Show priority on hover
      >
        {getPriorityIcon(task.priority)}
      </Box>
      
      <Stack gap="xs">
        <Text size="sm" fw={500} lineClamp={2} pr="20px"> {/* Add padding to avoid icon overlap */}
          {task.title}
        </Text>
        
        {/* Story Points badge only */}
        {task.storyPoints && (
          <Flex gap="xs" wrap="wrap">
            <Badge size="xs" variant="outline">
              {task.storyPoints} SP
            </Badge>
          </Flex>
        )}
        
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