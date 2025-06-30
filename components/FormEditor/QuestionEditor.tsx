import React from 'react';
import { View, Text, TextInput, Switch, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ConditionalNext, FormQuestion } from '../../models/formTypes';
import { TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import ConditionalEditor from './ConditionalEditor';

type Props = {
  question: FormQuestion;
  allPageIds: string[];
  onChange: (question: FormQuestion) => void;
};

const QUESTION_TYPES = ['text', 'number', 'select', 'checkbox', 'radio'] as const;

export default function QuestionEditor({ question, allPageIds, onChange }: Props) {
  const updateField = (key: keyof FormQuestion, value: any) => {
    onChange({ ...question, [key]: value });
  };

  return (
    <View className="mb-4 p-2 border rounded">
      <Text className="font-semibold text-base mb-1">Question Label</Text>
      <TextInput
        className="border p-2 rounded mb-2"
        placeholder="Enter question label"
        value={question.label}
        onChangeText={(text) => updateField('label', text)}
      />

      <Text className="font-semibold text-base mb-1">Type</Text>
      <View className="border rounded mb-2 bg-white">
        <Picker
          selectedValue={question.type}
          onValueChange={(type) => updateField('type', type)}
        >
          {QUESTION_TYPES.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {(question.type === 'select' ||
        question.type === 'radio' ||
        question.type === 'checkbox') && (
          <View className="mb-2">
            <Text className="font-semibold text-base mb-2">Options</Text>

            {(question.options || []).map((opt, idx) => (
              <View key={idx} className="flex-row items-center mb-1">
                <TextInput
                  className="flex-1 border p-2 rounded mr-2"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChangeText={(text) => {
                    const newOptions = [...(question.options || [])];
                    newOptions[idx] = text;
                    onChange({ ...question, options: newOptions });
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    const newOptions = (question.options || []).filter((_, i) => i !== idx);
                    onChange({ ...question, options: newOptions });
                  }}
                  className="bg-red-500 px-2 py-1 rounded"
                >
                  <X size={14} color="white" />
                </TouchableOpacity>
              </View>
            ))}

            <Button
              title="Add Option"
              onPress={() =>
                onChange({
                  ...question,
                  options: [...(question.options || []), ''],
                })
              }
            />
          </View>
        )}
      <View className="flex-row items-center mt-2">
        <Switch
          value={question.required ?? false}
          onValueChange={(val) => updateField('required', val)}
        />
        <Text className="ml-2 text-base">Required</Text>
      </View>
      <ConditionalEditor
        value={question.next}
        pageIds={allPageIds}
        onChange={(next: ConditionalNext) => onChange({ ...question, next })}
      />
    </View>
  );
}
