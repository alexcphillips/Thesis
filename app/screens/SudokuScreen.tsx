import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SudokuTile } from "../features/games/sudoku/SudokuTile";

const generateEmptyBoard = (): SudokuTile[][] => {
  return Array(9)
    .fill(null)
    .map((_, rowIndex) =>
      Array(9)
        .fill(null)
        .map(
          (_, colIndex) => new SudokuTile(0, { row: rowIndex, col: colIndex })
        )
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#4CAF50",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  resetButton: {
    color: "#fff",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  board: {
    width: Dimensions.get("window").width * 0.9,
    aspectRatio: 1,
    marginVertical: 20,
  },
  tile: {
    width: (Dimensions.get("window").width * 0.9) / 9 - 2,
    height: (Dimensions.get("window").width * 0.9) / 9 - 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  highlightedTile: {
    backgroundColor: "#E0E0E0",
  },
  fixedTile: {
    backgroundColor: "#D3D3D3",
  },
  tileText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyTile: {
    backgroundColor: "#F0F0F0",
  },
});

const SudokuScreen: React.FC = () => {
  // Use SudokuTile[][] instead of number[][]
  const [board, setBoard] = useState<SudokuTile[][]>(generateEmptyBoard());
  const [selectedTile, setSelectedTile] = useState<{
    row: number;
    col: number;
  } | null>(null);

  // Handle tile press
  const handleTilePress = (row: number, col: number) => {
    setSelectedTile({ row, col });
  };

  // Render each tile
  const renderTile = ({ item, index }: { item: SudokuTile; index: number }) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const isHighlighted =
      selectedTile?.row === row && selectedTile?.col === col;

    return (
      <TouchableOpacity
        style={[
          styles.tile,
          isHighlighted && styles.highlightedTile,
          item.isEmpty() && styles.emptyTile,
          item.value !== 0 && styles.fixedTile, // Fixed tiles style (non-zero values)
        ]}
        onPress={() => handleTilePress(row, col)}
        activeOpacity={0.7}
      >
        <Text style={styles.tileText}>
          {item.value !== 0 ? item.value : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sudoku</Text>
        <TouchableOpacity onPress={() => setBoard(generateEmptyBoard())}>
          <Text style={styles.resetButton}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.board}>
        <FlatList
          data={board.flat()}
          renderItem={renderTile}
          keyExtractor={(_, index) => index.toString()}
          numColumns={9}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default SudokuScreen;
