import { Container, Title, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ProjectList } from '../components/ProjectList.jsx';
import { useTranslation } from '../hooks/useTranslation.js';

export function HomePage({ projects, loading, accessToken, onProjectSelect }) {
  const { t } = useTranslation();

  if (!accessToken) {
    return (
      <Container size="lg" py="xl">
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title={t('common.accessTokenRequired')} 
          color="blue"
        >
          {t('common.pleaseSetAccessToken')}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl" mt="md">
      <Title order={1} mb="lg">{t('projects.title')}</Title>
      <ProjectList 
        projects={projects} 
        loading={loading} 
        onProjectSelect={onProjectSelect}
      />
    </Container>
  );
} 