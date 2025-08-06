import { useState, useEffect } from 'react';

export function useTasks(selectedProject) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Task statuses in order for columns
  const taskStatuses = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

  // Mock tasks data - this will be replaced with API calls
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
                        setTasks([
                    {
                      id: 1,
                      title: 'Set up project structure',
                      prompt: 'Initialize the basic project structure and configuration',
                      status: 'TO_DO',
                      priority: 'HIGH',
                      assigneeName: 'John Doe',
                      storyPoints: 3,
                      tags: [
                        { name: 'setup', color: '#3B82F6' },
                        { name: 'configuration', color: '#10B981' }
                      ],
                      createdAt: '2024-01-15'
                    },
                    {
                      id: 2,
                      title: 'Design database schema',
                      prompt: 'Create the database schema and relationships',
                      status: 'IN_PROGRESS',
                      priority: 'CRITICAL',
                      assigneeName: 'Jane Smith',
                      storyPoints: 5,
                      tags: [
                        { name: 'database', color: '#F59E0B' },
                        { name: 'design', color: '#8B5CF6' }
                      ],
                      createdAt: '2024-01-14'
                    },
                    {
                      id: 3,
                      title: 'Implement authentication',
                      prompt: 'Add user authentication and authorization',
                      status: 'IN_REVIEW',
                      priority: 'HIGH',
                      assigneeName: 'Mike Johnson',
                      storyPoints: 4,
                      tags: [
                        { name: 'auth', color: '#EF4444' },
                        { name: 'security', color: '#06B6D4' }
                      ],
                      createdAt: '2024-01-13'
                    },
                    {
                      id: 4,
                      title: 'Create API documentation',
                      prompt: 'Document all API endpoints and usage',
                      status: 'DONE',
                      priority: 'MEDIUM',
                      assigneeName: 'Sarah Wilson',
                      storyPoints: 2,
                      tags: [
                        { name: 'documentation', color: '#84CC16' },
                        { name: 'api', color: '#F97316' }
                      ],
                      createdAt: '2024-01-12'
                    }
                  ]);
      setLoading(false);
    }, 1000);
  }, [selectedProject]);

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const addTask = (newTask) => {
    const task = {
      id: Date.now(), // Simple ID generation for now
      ...newTask,
      status: 'TO_DO', // New tasks always start in TO_DO
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return {
    tasks,
    loading,
    taskStatuses,
    getTasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    moveTask
  };
} 