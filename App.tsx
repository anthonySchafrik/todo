// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {AsyncStorage, SafeAreaView, StyleSheet, Text, View} from 'react-native';

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

  async function saveTodos() {
    try {
      const jsonValue = JSON.stringify(todos);

      await AsyncStorage.setItem('todos', jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchTodos() {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');

      setTodos(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTodos();

    return () => {
      saveTodos();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text style={styles.text}>Todo List</Text>
      <TodoContainer todos={todos} handleTodo={handleTodo} />
      <View style={styles.buttonContainer}>
        <Button text="Save todos" onPress={saveTodos} />
      </View>
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
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default App;
