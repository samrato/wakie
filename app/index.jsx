import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.result}>Hello, {name} 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff8e1',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#6d4c41',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a1887f',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    color: '#4e342e',
  },
});
