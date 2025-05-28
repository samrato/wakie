import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [counter, setcounter] = useState(0);
  const increment = () => {
    setcounter(counter + 1);
  };
  const decrement = () => {
    setcounter(counter - 1);
  };
  const handlePress = () => {
    setGreeting(`Welcome, ${name}! 🎉`);
  };
  const reset = () => {
    setcounter(0);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Say Hello</Text>
      </TouchableOpacity>
      {greeting !== "" && <Text style={styles.result}>{greeting}</Text>}

      <View style={{ marginTop: 40 }}>
        <Text style={styles.label}>This is a counter app</Text>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>{counter}</Text>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>

        {counter > 10 && (
          <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
            That's a big number! 🚀
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f0f4c3",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#33691e",
  },
  input: {
    borderWidth: 1,
    borderColor: "#8bc34a",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#558b2f",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    fontSize: 20,
    color: "#33691e",
  },

  counter: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#33691e",
    textAlign: "center",
    marginBottom: 20,
  },
});
