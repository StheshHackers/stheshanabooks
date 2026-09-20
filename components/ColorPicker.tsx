import { useState } from "react";
import { View, Pressable, Text, TextInput, StyleSheet, ScrollView } from "react-native";

type ColorPickerProps = {
  selectedColor: string;
  onColorChange: (color: string) => void; // event listener
  colors?: string[];
};

const DEFAULT_COLORS = [
  "#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#00C7BE",
  "#32ADE6", "#007AFF", "#5856D6", "#AF52DE", "#FF2D55",
  "#8E8E93", "#000000", "#FFFFFF", "#F2F2F7"
];

export default function ColorPicker({ 
  selectedColor, 
  onColorChange,
  colors = DEFAULT_COLORS 
}: ColorPickerProps) {
  const [customHex, setCustomHex] = useState(selectedColor);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pick a color</Text>
      
      {/* Color Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {colors.map((color) => (
          <Pressable
            key={color}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              selectedColor === color && styles.selected
            ]}
            onPress={() => onColorChange(color)} // FIRE EVENT
          />
        ))}
      </ScrollView>

      {/* Custom Hex Input */}
      <View style={styles.inputRow}>
        <View style={[styles.preview, { backgroundColor: selectedColor }]} />
        <TextInput
          style={styles.input}
          value={customHex}
          onChangeText={setCustomHex}
          placeholder="#RRGGBB"
          maxLength={7}
          autoCapitalize="characters"
        />
        <Pressable 
          style={styles.applyBtn} 
          onPress={() => {
            if (/^#[0-9A-F]{6}$/i.test(customHex)) {
              onColorChange(customHex); // FIRE EVENT
            }
          }}
        >
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  colorBox: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#E5E5EA" },
  selected: { borderColor: "#007AFF", borderWidth: 3 },
  inputRow: { flexDirection: "row", alignItems: "center", marginTop: 16, gap: 8 },
  preview: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, fontFamily: "monospace" },
  applyBtn: { backgroundColor: "#007AFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  applyText: { color: "white", fontWeight: "600" },
});
