import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { FormPage, FormQuestion } from '../../models/formTypes';
import { TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import QuestionEditor from './QuestionEditor';

type Props = {
  page: FormPage;
  allPageIds: string[];
  onChange: (page: FormPage) => void;
};

export default function PageEditor({ page, allPageIds, onChange }: Props) {
  const removeQuestion = (index: number) => {
    const updated = page.questions.filter((_, i) => i !== index);
    onChange({ ...page, questions: updated });
  };

  const updateQuestion = (index: number, q: FormQuestion) => {
    const updated = [...page.questions];
    updated[index] = q;
    onChange({ ...page, questions: updated });
  };

  const addQuestion = () => {
    const newQ: FormQuestion = {
      id: `q-${page.questions.length + 1}`,
      type: 'text',
      label: '',
    };
    onChange({ ...page, questions: [...page.questions, newQ] });
  };

  return (
    <View className="p-2 border rounded mb-4">
      <Text className="text-lg font-bold mb-2">Edit {page.title}</Text>
      <TextInput
        className="border p-2 rounded mb-2"
        placeholder="Page Title"
        value={page.title}
        onChangeText={(t) => onChange({ ...page, title: t })}
      />
      {page.questions.map((q, idx) => (
        <View className="relative">
          <QuestionEditor
            key={q.id}
            question={q}
            allPageIds={allPageIds}
            onChange={(newQ: FormQuestion) => updateQuestion(idx, newQ)}
          />
          <TouchableOpacity
            onPress={() => removeQuestion(idx)}
            className="absolute top-2 right-2 bg-red-500 p-1 rounded-full"
          >
            <X size={16} color="white" />
          </TouchableOpacity>
        </View>
      ))}
      <Button title="Add Question" onPress={addQuestion} />
    </View>
  );
}
