import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { FormDefinition, FormPage } from '../../models/formTypes';
import { TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import PageEditor from './PageEditor';

type Props = {
  initialForm?: FormDefinition;
  onSave: (form: FormDefinition) => void;
};

export default function FormEditor({ initialForm, onSave }: Props) {
  const [form, setForm] = useState<FormDefinition>(
    initialForm || {
      id: Date.now().toString(),
      title: '',
      description: '',
      pages: [],
    }
  );

  const removePage = (index: number) => {
    const updated = form.pages.filter((_, i) => i !== index);
    setForm({ ...form, pages: updated });
  };

  const addPage = () => {
    const newPage: FormPage = {
      id: `page-${form.pages.length + 1}`,
      title: `Page ${form.pages.length + 1}`,
      questions: [],
    };
    setForm({ ...form, pages: [...form.pages, newPage] });
  };

  const updatePage = (index: number, page: FormPage) => {
    const newPages = [...form.pages];
    newPages[index] = page;
    setForm({ ...form, pages: newPages });
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-4">Form Builder</Text>
      <TextInput
        className="border p-2 rounded mb-2"
        placeholder="Form Title"
        value={form.title}
        onChangeText={(t) => setForm({ ...form, title: t })}
      />
      <TextInput
        className="border p-2 rounded mb-4"
        placeholder="Form Description"
        value={form.description}
        onChangeText={(d) => setForm({ ...form, description: d })}
      />

      {form.pages.map((page, idx) => (
        <View className="relative">
          <PageEditor
            key={page.id}
            page={page}
            allPages={form.pages}
            onChange={(updatedPage: FormPage) => updatePage(idx, updatedPage)}
          />
          <TouchableOpacity
            onPress={() => removePage(idx)}
            className="absolute top-2 right-2 bg-red-600 p-1 rounded-full z-10"
          >
            <X size={18} color="white" />
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Add Page" onPress={addPage} />
      <View className="mt-4">
        <Button title="Save Form" onPress={() => onSave(form)} />
      </View>
    </ScrollView>
  );
}
