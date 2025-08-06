import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export function KanbanPage({ selectedProject, onBackToProjects }) {
  return (
    <Container size="xl" py="xl" mt="md">
      <Group mb="lg">
        <Button 
          variant="subtle" 
          leftSection={<IconArrowLeft size={16} />}
          onClick={onBackToProjects}
        >
          Back to Projects
        </Button>
      </Group>
      
      <Title order={1} mb="lg">
        {selectedProject?.title} - Kanban Board
      </Title>
      
      <Text c="dimmed" mb="xl">
        Kanban board implementation coming soon...
      </Text>
      
      {/* Future Kanban board will go here */}
      <div style={{ 
        border: '2px dashed #ccc', 
        borderRadius: '8px', 
        padding: '40px', 
        textAlign: 'center' 
      }}>
        <Text size="lg" c="dimmed">
          Kanban Board for {selectedProject?.title}
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          This will show tasks organized by status columns
        </Text>
      </div>
    </Container>
  );
} 