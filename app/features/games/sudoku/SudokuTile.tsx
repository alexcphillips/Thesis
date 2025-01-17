import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

type SudokuTileProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
  onActivate: (index: number) => void;
  index: number;
};

const SudokuTile: React.FC<SudokuTileProps> = ({
  value,
  onChange,
  onActivate,
  index,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    value ? value.toString() : ""
  );

  const handleInputChange = (num: number | null) => {
    setInputValue(num ? num.toString() : "");
    onChange(num);
  };

  const handleClear = () => {
    setInputValue("");
    onChange(null);
  };

  const handleActivate = () => {
    onActivate(index);
  };

  return (
    <View style={styles.tile}>
      <TouchableOpacity onPress={handleActivate} style={styles.tileButton}>
        <TextInput
          style={styles.tileText}
          value={inputValue}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleInputChange(num)}
            style={styles.numberButton}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    margin: 10,
  },
  tileButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  tileText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  numberButton: {
    width: 30,
    height: 30,
    margin: 2,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    width: 30,
    height: 30,
    margin: 2,
    backgroundColor: "#ff6666",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SudokuTile;
