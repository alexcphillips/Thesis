// screens/HomeScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen</Text>
      <Button
        title="Go to Sudoku"
        onPress={() => navigation.navigate("Sudoku")}
      />
    </View>
  );
};

export default HomeScreen;
