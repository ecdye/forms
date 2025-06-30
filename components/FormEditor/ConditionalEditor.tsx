import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ConditionalNext } from '../../models/formTypes';
import { X } from 'lucide-react-native';

type Props = {
  value: ConditionalNext | undefined;
  pageIds: string[];
  pageTitles: string[];
  optionsForCondition?: string[];
  onChange: (next: ConditionalNext | undefined) => void;
};

export default function ConditionalEditor({
  value,
  pageIds,
  pageTitles,
  optionsForCondition,
  onChange,
}: Props) {
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

  const handleChangeCondition = (index: number, field: 'value' | 'targetPageId', newVal: string | number) => {
    if (!value || value.type !== 'conditional') return;

    const updated = [...value.conditions];
    (updated[index] as any)[field] = newVal;
    onChange({ ...value, conditions: updated });
  };

  const handleRemoveCondition = (index: number) => {
    if (!value || value.type !== 'conditional') return;
    const updated = [...value.conditions];
    updated.splice(index, 1);
    if (updated.length === 0) {
      onChange(undefined);
    } else {
      onChange({ ...value, conditions: updated });
    }
  };

  const handleSetDefault = (val: string) => {
    if (!value || value.type !== 'conditional') return;
    onChange({ ...value, defaultTarget: val });
  };

  return (
    <View className="my-2 p-2 border rounded">
      <Text className="font-bold mb-2">Conditional Jump Logic</Text>

      {value?.type === 'conditional' &&
        value.conditions.map((cond, idx) => (
          <View key={idx} className="mb-2 relative">
            <Text className="text-sm font-semibold mb-1">When Answer is:</Text>

            {optionsForCondition ? (
              <View className="border rounded bg-white mb-2">
                <Picker
                  selectedValue={cond.value}
                  onValueChange={(val) =>
                    handleChangeCondition(idx, 'value', val)
                  }
                >
                  {optionsForCondition.map((opt) => (
                    <Picker.Item key={opt} label={opt} value={opt} />
                  ))}
                </Picker>
              </View>
            ) : (
              <TextInput
                className="border p-2 rounded mb-2"
                placeholder="Answer value"
                value={cond.value.toString()}
                onChangeText={(text) =>
                  handleChangeCondition(idx, 'value', text)
                }
              />
            )}

            <Text className="text-sm font-semibold mb-1">Jump to Page:</Text>
            <View className="border rounded bg-white">
              <Picker
                selectedValue={cond.targetPageId}
                onValueChange={(val) =>
                  handleChangeCondition(idx, 'targetPageId', val)
                }
              >
                {pageIds.map((id, i) => (
                  <Picker.Item key={id} label={pageTitles[i]} value={id} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              onPress={() => handleRemoveCondition(idx)}
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-full"
            >
              <X size={14} color="white" />
            </TouchableOpacity>
          </View>
        ))}

      <Button title="Add Condition" onPress={handleAddCondition} />

      {value?.type === 'conditional' && (
        <View className="mt-4">
          <Text className="font-semibold mb-1">Default Page</Text>
          <View className="border rounded bg-white">
            <Picker
              selectedValue={value.defaultTarget}
              onValueChange={handleSetDefault}
            >
              {pageIds.map((id, i) => (
                <Picker.Item key={id} label={pageTitles[i]} value={id} />
              ))}
            </Picker>
          </View>
        </View>
      )}

      {value?.type === 'conditional' && (
        <View className="mt-4">
          <TouchableOpacity
            onPress={() => onChange(undefined)}
            className="bg-red-500 rounded p-3 items-center"
          >
            <Text className="text-white font-semibold">Delete Conditional Logic</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
