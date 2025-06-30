import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormDefinition } from '../models/formTypes';

const STORAGE_KEY = 'conditional_forms';

export async function getAllForms(): Promise<FormDefinition[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveForm(updated: FormDefinition): Promise<void> {
  const forms = await getAllForms();
  const newForms = forms.filter(f => f.id !== updated.id);
  newForms.push(updated);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newForms));
}

export async function deleteForm(id: string): Promise<void> {
  const forms = await getAllForms();
  const filtered = forms.filter(f => f.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function getForm(id: string): Promise<FormDefinition | undefined> {
  const forms = await getAllForms();
  return forms.find(f => f.id === id);
}
