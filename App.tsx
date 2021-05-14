import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  // AsyncStorage,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

  async function trackEvent(math: string, payload: any) {
    try {
      await Analytics.trackEvent(`${math} todo`, payload);
    } catch (error) {
      console.log(error);

      checkCrash();
    }
  }

  async function checkCrash() {
    const didCrash = await Crashes.hasCrashedInLastSession();

    if (didCrash) {
      const crashReport = await Crashes.lastSessionCrashReport();
      const na = 'not available';

      const payload = {
        osName: crashReport?.device.osName || na,
        appVersion: crashReport?.device.appVersion || na,
        screenSize: crashReport?.device.screenSize || na,
        model: crashReport?.device.model || na,
        errorTime: crashReport.appErrorTime + '',
      };

      await Analytics.trackEvent('CrashReport', payload);
    }
  }

  function handleTodo(todo: string | undefined, index: number, math: string) {
    trackEvent(math, {todo, index});

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

      Alert.alert('Todos where saved', 'You can safely close the app', [
        {text: 'OK', onPress: () => {}},
      ]);
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
    checkCrash();
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
    paddingBottom: 25,
  },
});

export default App;
