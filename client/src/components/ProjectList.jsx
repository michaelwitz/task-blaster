import { Table, Text, Badge, Group } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';

export function ProjectList({ projects, loading, onProjectSelect }) {
  const { t } = useTranslation();
  
  if (loading) {
    return <Text>{t('common.loading')}</Text>;
  }

  if (!projects || projects.length === 0) {
    return <Text>{t('projects.noProjects')}</Text>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t('tasks.title')}</Table.Th>
          <Table.Th>{t('projects.leader')}</Table.Th>
          <Table.Th>{t('projects.createdAt')}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {projects.map((project) => (
          <Table.Tr 
            key={project.id} 
            style={{ cursor: 'pointer' }}
            onClick={() => onProjectSelect(project)}
          >
            <Table.Td>
              <Text fw={500}>{project.title}</Text>
              <Text size="sm" c="dimmed">{project.code}</Text>
            </Table.Td>
            <Table.Td>
              <Text>{project.leaderName}</Text>
              <Text size="sm" c="dimmed">{project.leaderEmail}</Text>
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <IconCalendar size={14} />
                <Text size="sm">{formatDate(project.createdAt)}</Text>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
} 