import React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SudokuScreen from "./screens/SudokuScreen";

// Create a stack navigator
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationIndependentTree>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Sudoku" component={SudokuScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NavigationIndependentTree>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure the SafeAreaView fills the screen
    backgroundColor: "#fff", // Set the background color
    justifyContent: "flex-start", // Optional, to start the content from the top
    width: "100%", // Ensure the width is 100% of the screen width
  },
});

export default App;
