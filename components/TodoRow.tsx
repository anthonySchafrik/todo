import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Switch} from 'react-native';

interface Props {
  todo: string;
  index: number;
  handleTodo: (todo: string | undefined, index: number, math: string) => void;
}

export default function TodoRow({todo, index, handleTodo}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  function toggleSwitch() {
    setIsDeleting(previousState => !previousState);
  }

  const handleDeleting = useCallback(() => {
    if (isDeleting) {
      handleTodo(undefined, index, 'mins');
      toggleSwitch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleting]);

  useEffect(() => {
    handleDeleting();
  }, [handleDeleting]);

  return (
    <View style={styles.todoRow} key={index}>
      <TextInput
        style={styles.textInput}
        editable={false}
        multiline={false}
        value={todo}
      />

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isDeleting ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isDeleting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingLeft: 8},
  todoRow: {
    marginVertical: 15,
    width: '100%',
    flexDirection: 'row',
  },
  textInput: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    color: '#d1d1d1',
    width: '85%',
  },
});
