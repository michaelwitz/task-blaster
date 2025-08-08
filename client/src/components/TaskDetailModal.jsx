import { useState, useEffect } from 'react';
import { 
  Modal, 
  Stack, 
  TextInput, 
  Textarea, 
  Select, 
  NumberInput, 
  MultiSelect, 
  Button, 
  Group, 
  Badge, 
  Text,
  ActionIcon,
  Box,
  Switch
} from '@mantine/core';
import { 
  IconUser, 
  IconCalendar, 
  IconX, 
  IconEdit,
  IconDeviceFloppy,
  IconGitBranch,
  IconGitPullRequest,
  IconLock
} from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTags } from '../hooks/useTags.js';
import { useUsers } from '../hooks/useUsers.js';

export function TaskDetailsModal({ 
  task, 
  opened, 
  onClose, 
  onSave
}) {
  const { t, translatePriority } = useTranslation();
  const { tags = [] } = useTags();
  const { users = [] } = useUsers();
  const [editedTask, setEditedTask] = useState(null);

  // Initialize edited task when modal opens
  useEffect(() => {
    if (task && opened) {
      setEditedTask({
        ...task,
        tags: task.tags && Array.isArray(task.tags) ? task.tags.map(tag => tag?.tag || '').filter(Boolean) : [],
        isBlocked: Boolean(task.isBlocked),
        blockedReason: task.blockedReason || '',
        gitFeatureBranch: task.gitFeatureBranch || '',
        gitPullRequestUrl: task.gitPullRequestUrl || ''
      });
    }
  }, [task, opened]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'yellow';
      case 'LOW': return 'blue';
      default: return 'gray';
    }
  };

  const handleSave = () => {
    if (onSave && editedTask) {
      const tagColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'];
      const tagsWithColors = editedTask.tags.map((tagName, index) => ({
        name: tagName,
        color: tagColors[index % tagColors.length]
      }));
      
      onSave({
        ...editedTask,
        tags: tagsWithColors,
        tagNames: editedTask.tags // Send tag names for API update
      });
    }
  };

  const handleCancel = () => {
    setEditedTask({
      ...task,
      tags: task.tags && Array.isArray(task.tags) ? task.tags.map(tag => tag?.tag || '').filter(Boolean) : []
    });
  };

  const handleClose = () => {
    onClose();
  };

  if (!task || !opened) return null;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={null}
      withCloseButton={false}
      size="50%"
      styles={{
        content: {
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid var(--mantine-color-gray-3)',
          borderRadius: '12px',
          overflow: 'hidden',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <div style={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Task ID appendage on top - centered */}
        <Box
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--mantine-color-blue-6)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {task.taskId}
        </Box>

        {/* Header with Task Title, Edit Button, and Close Button */}
        <Box
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--mantine-color-gray-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '8px 8px 0 0',
            position: 'relative',
            flexShrink: 0
          }}
        >
          {/* Task Title */}
          <Text size="lg" fw={600} style={{ flex: 1, marginTop: '8px' }}>
            {task.title}
          </Text>
          
          {/* Close Button */}
          <ActionIcon
            variant="subtle"
            onClick={handleClose}
            title={t('common.close')}
            size="sm"
          >
            <IconX size={16} />
          </ActionIcon>
        </Box>

        {/* Modal Content */}
        <Box p="md" style={{ flex: 1, overflowY: 'auto' }}>
          <Stack gap="md">
              {/* Title and Status on same line */}
              <Group grow={false}>
                <TextInput
                  label={t('tasks.title')}
                  placeholder={t('tasks.title')}
                  value={editedTask?.title || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  required
                  style={{ flex: 1, minWidth: '300px' }}
                />
                
                <Select
                  label={t('tasks.status')}
                  data={[
                    { value: 'TO_DO', label: t('tasks.statuses.TO_DO') },
                    { value: 'IN_PROGRESS', label: t('tasks.statuses.IN_PROGRESS') },
                    { value: 'IN_REVIEW', label: t('tasks.statuses.IN_REVIEW') },
                    { value: 'DONE', label: t('tasks.statuses.DONE') }
                  ]}
                  value={editedTask?.status || 'TO_DO'}
                  onChange={(value) => setEditedTask({ ...editedTask, status: value })}
                  maxDropdownHeight={200}
                  style={{ minWidth: '120px', maxWidth: '150px' }}
                />
              </Group>
              
              {/* Story Points and Priority on same line */}
              <Group grow>
                <NumberInput
                  label={t('tasks.storyPoints')}
                  placeholder={t('tasks.storyPoints')}
                  value={editedTask?.storyPoints || null}
                  onChange={(value) => setEditedTask({ ...editedTask, storyPoints: value })}
                  min={1}
                  max={21}
                />
                
                <Select
                  label={t('tasks.priority')}
                  data={[
                    { value: 'LOW', label: t('tasks.priorities.LOW') },
                    { value: 'MEDIUM', label: t('tasks.priorities.MEDIUM') },
                    { value: 'HIGH', label: t('tasks.priorities.HIGH') },
                    { value: 'CRITICAL', label: t('tasks.priorities.CRITICAL') }
                  ]}
                  value={editedTask?.priority || 'MEDIUM'}
                  onChange={(value) => setEditedTask({ ...editedTask, priority: value })}
                />
              </Group>
              
              {/* Tags */}
              <MultiSelect
                label={t('tags.title')}
                placeholder={t('tags.selectOrCreate')}
                data={Array.isArray(tags) ? tags.map(tag => ({ value: tag.tag, label: tag.tag })) : []}
                value={editedTask?.tags || []}
                onChange={(value) => setEditedTask({ ...editedTask, tags: value })}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => query}
              />
              
              {/* Git Feature Branch */}
              <TextInput
                label={t('tasks.gitFeatureBranch')}
                placeholder={t('tasks.gitFeatureBranchPlaceholder')}
                value={editedTask?.gitFeatureBranch || ''}
                onChange={(e) => setEditedTask({ ...editedTask, gitFeatureBranch: e.target.value })}
                leftSection={<IconGitBranch size={16} />}
              />
              
              {/* Git Pull Request URL */}
              <TextInput
                label={t('tasks.gitPullRequestUrl')}
                placeholder={t('tasks.gitPullRequestUrlPlaceholder')}
                value={editedTask?.gitPullRequestUrl || ''}
                onChange={(e) => setEditedTask({ ...editedTask, gitPullRequestUrl: e.target.value })}
                leftSection={<IconGitPullRequest size={16} />}
              />
              
              {/* Assignee */}
              <Select
                label={t('tasks.assignee')}
                placeholder={t('tasks.selectAssignee')}
                data={[
                  { value: '', label: t('tasks.unassigned') },
                  ...(Array.isArray(users) ? users.map(user => ({ 
                    value: user.id.toString(), 
                    label: user.fullName 
                  })) : [])
                ]}
                value={editedTask?.assigneeId?.toString() || ''}
                onChange={(value) => {
                  const selectedUser = users.find(u => u.id.toString() === value);
                  setEditedTask({ 
                    ...editedTask, 
                    assigneeId: value ? parseInt(value) : null,
                    assigneeName: selectedUser ? selectedUser.fullName : ''
                  });
                }}
                leftSection={<IconUser size={16} />}
                clearable
              />
              
              {/* Blocked and Blocked Reason on same line */}
              <Group align="flex-end">
                <Switch
                  label={t('tasks.isBlocked')}
                  checked={editedTask?.isBlocked || false}
                  onChange={(e) => setEditedTask({ ...editedTask, isBlocked: e.currentTarget.checked })}
                  leftSection={<IconLock size={16} />}
                />
                
                {editedTask?.isBlocked && (
                  <TextInput
                    label={t('tasks.blockedReason')}
                    placeholder={t('tasks.blockedReasonPlaceholder')}
                    value={editedTask?.blockedReason || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, blockedReason: e.target.value })}
                    style={{ flex: 1 }}
                  />
                )}
              </Group>
              
              {/* Prompt at the bottom */}
              <Textarea
                label={t('tasks.prompt')}
                placeholder={t('tasks.prompt')}
                value={editedTask?.prompt || ''}
                onChange={(e) => setEditedTask({ ...editedTask, prompt: e.target.value })}
                rows={4}
              />
            </Stack>
        </Box>
        
        {/* Buttons - outside scrollable area */}
        <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)', flexShrink: 0 }}>
            <Group justify="flex-end">
              <Button variant="subtle" onClick={handleCancel}>
                {t('common.cancel')}
              </Button>
              <Button 
                leftSection={<IconDeviceFloppy size={16} />}
                onClick={handleSave}
              >
                {t('common.save')}
              </Button>
            </Group>
          </Box>
      </div>
    </Modal>
  );
}
