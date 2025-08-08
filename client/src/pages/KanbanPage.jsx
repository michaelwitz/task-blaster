import { Container, Text, Button, Grid, Stack, Badge, Group } from '@mantine/core';
import { IconArrowLeft, IconUser, IconCalendar } from '@tabler/icons-react';
import { useTranslation } from '../hooks/useTranslation.js';
import { useTasks } from '../hooks/useTasks.js';
import { useModalManager } from '../hooks/useModalManager.js';
import { KanbanColumn } from '../components/KanbanColumn.jsx';
import { TaskDetailsModal } from '../components/TaskDetailModal.jsx';
import { useState, useEffect } from 'react';

export function KanbanPage({ selectedProject, onBackToProjects }) {
  const { t, translatePriority, i18n } = useTranslation();
  const { 
    tasks, 
    loading, 
    taskStatuses, 
    getTasksByStatus,
    refreshTasks 
  } = useTasks(selectedProject);
  
  // Use custom hooks for better separation of concerns
  const { openModals, openModal, closeModal, updateModalTask } = useModalManager();

  // Debug info for Kanban board
  useEffect(() => {
    if (selectedProject && !loading) {
      console.log('=== KANBAN DEBUG ===');
      console.log('Project:', selectedProject.title, `(${selectedProject.code})`);
      console.log('Total Tasks:', tasks.length);
      console.log('Open Modals:', openModals.length);
      taskStatuses.forEach(status => {
        const statusTasks = getTasksByStatus(status);
        console.log(`${status}:`, statusTasks.length, 'tasks');
      });
      console.log('LOCALE:', navigator.language);
      console.log('===================');
    }
  }, [selectedProject, tasks, openModals, loading, taskStatuses, getTasksByStatus]);

  const handleTaskEdit = (task) => {
    const modalId = `edit-${task.id}`;
    openModal(modalId, task);
  };

  const handleTaskMove = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('TB_TOKEN');
      if (!token) {
        console.error('No access token found');
        return;
      }

      // Find the task to get its current data
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        console.error('Task not found');
        return;
      }

      // Update the task status
      const response = await fetch(`http://localhost:3030/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'TB_TOKEN': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...task,
          status: newStatus
        })
      });

      if (response.ok) {
        console.log(`Task ${taskId} moved to ${newStatus}`);
        await refreshTasks();
      } else {
        console.error('Failed to move task');
      }
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const handleModalClose = (modalId) => {
    closeModal(modalId);
  };

  const handleTaskSave = async (modalId, updatedTask) => {
    try {
      // Make API call to save task
      const token = localStorage.getItem('TB_TOKEN');
      if (!token) {
        console.error('No access token found');
        return;
      }

      const response = await fetch(`http://localhost:3030/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'TB_TOKEN': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: updatedTask.title,
          status: updatedTask.status,
          priority: updatedTask.priority,
          storyPoints: updatedTask.storyPoints,
          assigneeId: updatedTask.assigneeId,
          prompt: updatedTask.prompt,
          isBlocked: updatedTask.isBlocked,
          blockedReason: updatedTask.blockedReason,
          gitFeatureBranch: updatedTask.gitFeatureBranch,
          gitPullRequestUrl: updatedTask.gitPullRequestUrl,
          tagNames: updatedTask.tagNames || []
        })
      });

      if (response.ok) {
        const savedTask = await response.json();
        
        // Update the task in the modal
        updateModalTask(modalId, savedTask);
        
        // Refresh tasks to update the board
        await refreshTasks();
      } else if (response.status === 401) {
        console.error('Unauthorized - access token invalid');
        if (window.showToast) {
          window.showToast('error', 'Access token invalid. Please reload your access token.');
        } else {
          alert('Access token invalid. Please reload your access token.');
        }
      } else {
        console.error('Failed to save task:', response.status);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  if (loading) {
    return (
      <Container size="xl" py="xl" mt="md">
        <Text>{t('common.loading')}</Text>
      </Container>
    );
  }

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '16px', paddingTop: '80px' }}>
        {/* Kanban board - fills available space */}
        <Grid gutter="xs" style={{ flex: 1, minHeight: 'calc(100vh - 120px)' }}>
          {taskStatuses.map(status => (
            <KanbanColumn 
              key={status} 
              status={status} 
              tasks={getTasksByStatus(status)} 
              onTaskEdit={handleTaskEdit}
              onTaskMove={handleTaskMove}
            />
          ))}
        </Grid>
      </div>

      {/* Multiple Task Detail Modals */}
      {openModals.map(modal => (
        <TaskDetailsModal
          key={modal.id}
          task={modal.task}
          opened={true}
          onClose={() => handleModalClose(modal.id)}
          onSave={(updatedTask) => handleTaskSave(modal.id, updatedTask)}
        />
      ))}
    </>
  );
} 