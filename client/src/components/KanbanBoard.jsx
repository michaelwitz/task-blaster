import { Grid } from '@mantine/core';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn.jsx';

export function KanbanBoard({ taskStatuses, getTasksByStatus, onTaskEdit, onDragEnd }) {
  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <Grid gutter="xs" style={{ flex: 1, minHeight: 'calc(100vh - 120px)' }}>
        {taskStatuses.map(status => (
          <KanbanColumn 
            key={status} 
            status={status} 
            tasks={getTasksByStatus(status)} 
            onTaskEdit={onTaskEdit}
          />
        ))}
      </Grid>
    </DndContext>
  );
}
