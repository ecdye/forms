import "./global.css"
import { View } from "react-native";
import FormEditor from "./components/FormEditor/FormEditor";
import { FormDefinition } from "./models/formTypes";

function handleSave(form: FormDefinition) {
  console.log(form);
}

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <FormEditor onSave={handleSave} />
    </View>
  );
}
