import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{task.description}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
});
