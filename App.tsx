import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from './components/Button';
import TodoContainer from './components/TodoContainer';

const App = () => {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    height: '100%',
    width: '100%',
  };

  const [todos, setTodos] = useState<string[]>([]);

  function handleTodo(todo: string | undefined, index: number, math: string) {
    if (math === 'add' && todo) {
      setTodos([...todos, todo]);

      return;
    }

    setTodos([
      ...todos.slice(0, index),
      ...todos.slice(index + 1, todos.length),
    ]);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text style={styles.text}>Todo List</Text>
      <TodoContainer todos={todos} handleTodo={handleTodo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    alignSelf: 'center',
    marginVertical: 8,
    color: '#4E4E4E',
  },
});

export default App;
