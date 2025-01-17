import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { generateEmptyBoard } from "../features/games/sudoku/utils";
import { SudokuTile } from "../features/games/sudoku/SudokuTile"; // Import the SudokuTile class

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
});

const SudokuScreen: React.FC = () => {
  // State is now SudokuTile[][], not number[][]
  const [board, setBoard] = useState<SudokuTile[][]>(generateEmptyBoard());
  const [selectedTile, setSelectedTile] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleTilePress = (row: number, col: number) => {
    const newBoard = [...board]; // Copy the current board
    const selectedTile = newBoard[row][col];
    selectedTile.toggleHighlight(); // Toggle highlight on the selected tile
    setBoard(newBoard); // Update the board with the new highlighted state
    setSelectedTile({ row, col });
  };

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
          item.value !== 0 && styles.fixedTile, // If value is non-zero, treat it as fixed
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
          data={board.flat()} // Flatten the 2D board into a 1D array for FlatList
          renderItem={renderTile}
          keyExtractor={(_, index) => index.toString()}
          numColumns={9} // Render 9 columns for the Sudoku grid
          scrollEnabled={false} // Disable scrolling for the static grid
        />
      </View>
    </View>
  );
};

export default SudokuScreen;
