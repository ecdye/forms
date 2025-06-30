import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { FormQuestion } from '../../models/formTypes';

type Props = {
  question: FormQuestion;
  onChange: (question: FormQuestion) => void;
};

export default function QuestionEditor({ question, onChange }: Props) {
  return (
    <View className="mb-2">
      <Text className="font-semibold mb-1">Question</Text>
      <TextInput
        className="border p-2 rounded mb-1"
        placeholder="Label"
        value={question.label}
        onChangeText={(t) => onChange({ ...question, label: t })}
      />
      <TextInput
        className="border p-2 rounded mb-1"
        placeholder="Type (text, number, select)"
        value={question.type}
        onChangeText={(t) => onChange({ ...question, type: t as any })}
      />
    </View>
  );
}
