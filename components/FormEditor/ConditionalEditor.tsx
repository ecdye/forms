import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ConditionalNext } from '../../models/formTypes';

type Props = {
  value: ConditionalNext | undefined;
  pageIds: string[];
  onChange: (next: ConditionalNext) => void;
};

export default function ConditionalEditor({ value, pageIds, onChange }: Props) {
  const handleAddCondition = () => {
    const next: ConditionalNext = value?.type === 'conditional'
      ? {
        ...value,
        conditions: [...value.conditions, { value: '', targetPageId: pageIds[0] }],
      }
      : {
        type: 'conditional',
        conditions: [{ value: '', targetPageId: pageIds[0] }],
      };

    onChange(next);
  };

  const handleChangeCondition = (index: number, field: 'value' | 'targetPageId', newVal: string) => {
    if (!value || value.type !== 'conditional') return;

    const updated = [...value.conditions];
    (updated[index] as any)[field] = newVal;
    onChange({ ...value, conditions: updated });
  };

  const handleSetDefault = (val: string) => {
    if (!value || value.type !== 'conditional') return;
    onChange({ ...value, defaultTarget: val });
  };

  return (
    <View className="mt-2 border-t pt-2">
      <Text className="font-bold mb-2">Conditional Jump Logic</Text>
      {value?.type === 'conditional' &&
        value.conditions.map((cond, idx) => (
          <View key={idx} className="mb-2">
            <TextInput
              className="border p-2 rounded mb-1"
              placeholder="Answer value"
              value={cond.value.toString()}
              onChangeText={(text) =>
                handleChangeCondition(idx, 'value', text)
              }
            />
            <TextInput
              className="border p-2 rounded"
              placeholder="Target Page ID"
              value={cond.targetPageId}
              onChangeText={(text) =>
                handleChangeCondition(idx, 'targetPageId', text)
              }
            />
          </View>
        ))}

      <Button title="Add Condition" onPress={handleAddCondition} />

      {value?.type === 'conditional' && (
        <View className="mt-3">
          <Text className="font-semibold">Default Target Page (if no match)</Text>
          <TextInput
            className="border p-2 rounded"
            placeholder="Default Page ID"
            value={value.defaultTarget || ''}
            onChangeText={handleSetDefault}
          />
        </View>
      )}
    </View>
  );
}
