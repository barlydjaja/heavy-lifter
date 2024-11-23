import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Metrics = 'kg' | 'lbs';

export interface Exercise {
  name: string;
  records: {
    date: string;
    weight: number;
  }[];
}

interface UserSettings {
  weight?: number;
  height?: number;
  metrics: Metrics;
}

interface ExerciseStore {
  exercises: Exercise[];
  userSettings: UserSettings;
  addExerciseRecord: (name: string, weight: number, date: string) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  convertWeight: (weight: number, from: Metrics, to: Metrics) => number;
  renameExercise: (oldName: string, newName: string) => void;
  deleteExercise: (name: string) => void;
}

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: [],
      userSettings: {
        metrics: 'kg',
      },
      
      addExerciseRecord: (name, weight, date) => {
        set((state) => {
          const exercises = [...state.exercises];
          const existingExercise = exercises.find(e => e.name === name);
          
          if (existingExercise) {
            existingExercise.records.push({ date, weight });
            existingExercise.records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          } else {
            exercises.push({
              name,
              records: [{ date, weight }]
            });
          }
          
          return { exercises };
        });
      },
      
      updateUserSettings: (settings) => {
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            ...settings
          }
        }));
      },
      
      convertWeight: (weight, from, to) => {
        if (from === to) return weight;
        return from === 'kg' ? weight * 2.20462 : weight / 2.20462;
      },

      renameExercise: (oldName: string, newName: string) => {
        set((state) => {
          const exerciseIndex = state.exercises.findIndex(e => e.name === oldName)
          if (exerciseIndex === -1) return state
      
          const newExercises = [...state.exercises]
          newExercises[exerciseIndex] = {
            ...newExercises[exerciseIndex],
            name: newName
          }
      
          return { exercises: newExercises }
        })
      },
      
      deleteExercise: (name: string) => {
        set((state) => ({
          exercises: state.exercises.filter(e => e.name !== name)
        }))
      }
    }),
    {
      name: 'heavy-lifter-storage',
    }
  )
);