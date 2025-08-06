import { Table, Text, Badge, Group, ActionIcon } from '@mantine/core';
import { IconCalendar, IconEdit } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';

export function ProjectList({ projects, loading, onProjectSelect, onProjectEdit }) {
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
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {projects.map((project) => (
          <Table.Tr 
            key={project.id} 
            style={{ 
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Table.Td>
              <div 
                style={{ 
                  cursor: 'pointer'
                }}
                onClick={() => {
                  console.log('Project title clicked:', project);
                  onProjectSelect(project);
                }}
              >
                <Text fw={500}>{project.title}</Text>
                <Text size="sm" c="dimmed">{project.code}</Text>
              </div>
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
            <Table.Td>
              <ActionIcon 
                variant="subtle" 
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit project clicked:', project);
                  onProjectEdit(project);
                }}
              >
                <IconEdit size={21} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
} 