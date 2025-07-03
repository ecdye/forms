import "./global.css"
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FormDefinition } from './models/formTypes';
import FormEditor from './components/FormEditor/FormEditor';
import FormList from './components/FormList/FormList';
import { getAllForms, saveForm, deleteForm } from './storage/formStorage';

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

  return (
    <View className="min-w-full flex flex-row">
      <View className="w-1/6 p-4 border-r bg-gray-800">
        <Text className="text-xl text-white font-bold mb-4">Saved Forms</Text>

        <FormList forms={forms} onEdit={setEditingForm} onDelete={handleDelete} />

        <TouchableOpacity
          onPress={() => {
            setEditingForm({
              id: Date.now().toString(),
              title: '',
              pages: [],
            });
          }}
          className="mr-2 px-5 py-2.5 rounded-md bg-blue-500 shadow-md hover:bg-blue-600 cursor-pointer align-center"
        >
          <Text className="text-white text-center text-l">Create New Form</Text>
        </TouchableOpacity>
      </View>

      {editingForm && (
        <View className="flex-1">
          <FormEditor
            initialForm={editingForm}
            onSave={handleSave}
          />
        </View>
      )}
    </View>
  );
}
