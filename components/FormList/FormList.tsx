import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { FormDefinition } from '../../models/formTypes';
import { X } from 'lucide-react-native';

type Props = {
  forms: FormDefinition[];
  onEdit: (form: FormDefinition) => void;
  onDelete: (id: string) => void;
};

export default function FormList({ forms, onEdit, onDelete }: Props) {
  return (
    <FlatList
      data={forms}
      keyExtractor={(f) => f.id}
      renderItem={({ item }) => (
        <View className="flex-row justify-between items-center mb-2 hover:border-l hover:border-l-white pl-2 pr-6 hover:bg-gray-700">
          <TouchableOpacity onPress={() => onEdit(item)}>
            <Text className="text-lg text-white pr-2">{item.title || '(Untitled Form)'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            className="absolute top-1 right-0 bg-red-500 p-1 rounded-full"
          >
            <X size={14} color="white" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
