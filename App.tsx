import "./global.css"
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { FormDefinition } from './models/formTypes';
import FormEditor from './components/FormEditor/FormEditor';
import { getAllForms, saveForm, deleteForm } from './storage/formStorage';
import { X } from 'lucide-react-native';

export default function App() {
  const [forms, setForms] = useState<FormDefinition[]>([]);
  const [editingForm, setEditingForm] = useState<FormDefinition | null>(null);

  const loadForms = async () => {
    const loaded = await getAllForms();
    setForms(loaded);
  };

  useEffect(() => {
    loadForms();
  }, []);

  const handleSave = async (form: FormDefinition) => {
    await saveForm(form);
    setEditingForm(null);
    await loadForms();
  };

  const handleDelete = async (id: string) => {
    await deleteForm(id);
    await loadForms();
  };

  if (editingForm) {
    return (
      <FormEditor
        initialForm={editingForm}
        onSave={handleSave}
      />
    );
  }

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Your Saved Forms</Text>

      <FlatList
        data={forms}
        keyExtractor={(f) => f.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-2 border-b pb-2 pr-6">
            <TouchableOpacity onPress={() => setEditingForm(item)}>
              <Text className="text-lg">{item.title || '(Untitled Form)'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              className="absolute top-1 right-0 bg-red-500 p-1 rounded-full"
            >
              <X size={14} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Button
        title="Create New Form"
        onPress={() =>
          setEditingForm({
            id: Date.now().toString(),
            title: '',
            pages: [],
          })
        }
      />
    </View>
  );
}
