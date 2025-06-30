import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { FormPage, FormQuestion } from '../../models/formTypes';
import QuestionEditor from './QuestionEditor';

type Props = {
  page: FormPage;
  onChange: (page: FormPage) => void;
};

export default function PageEditor({ page, onChange }: Props) {
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
        <QuestionEditor
          key={q.id}
          question={q}
          onChange={(newQ: FormQuestion) => updateQuestion(idx, newQ)}
        />
      ))}
      <Button title="Add Question" onPress={addQuestion} />
    </View>
  );
}
