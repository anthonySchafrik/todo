import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import Button from './Button';
import TodoRow from './TodoRow';

interface Props {
  todos: string[];
  handleTodo: (todo: string | undefined, index: number, math: string) => void;
}

export default function TodoContainer({todos, handleTodo}: Props) {
  const [update, setUpdate] = useState<undefined | string>(undefined);

  function handleEndEditing() {
    handleTodo(update, 0, 'add');
    setUpdate(undefined);
  }

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic">
      {todos.map((todo, index) => (
        <TodoRow
          key={index}
          todo={todo}
          index={index}
          handleTodo={handleTodo}
        />
      ))}
      <View style={styles.todoRow}>
        <Text style={styles.text}>New todo</Text>
        <TextInput
          style={styles.textInput}
          multiline={false}
          onChangeText={text => setUpdate(text)}
          onEndEditing={handleEndEditing}
          value={update}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {paddingLeft: 8},
  todoRow: {
    marginVertical: 15,
    width: '75%',
  },
  textInput: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    color: '#d1d1d1',
  },
  text: {
    color: '#d1d1d1',
  },
  buttonContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
