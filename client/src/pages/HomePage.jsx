import { Container, Title, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ProjectList } from '../components/ProjectList.jsx';

export function HomePage({ projects, loading, accessToken, onProjectSelect }) {
  if (!accessToken) {
    return (
      <Container size="lg" py="xl">
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Access Token Required" 
          color="blue"
        >
          Please set your access token using the menu in the top left to view projects.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl" mt="md">
      <Title order={1} mb="lg">Projects</Title>
      <ProjectList 
        projects={projects} 
        loading={loading} 
        onProjectSelect={onProjectSelect}
      />
    </Container>
  );
} 