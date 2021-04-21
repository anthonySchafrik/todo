import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
}

export default function Button({text, onPress}: Props) {
  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <Text style={styles.text} onPress={onPress}>
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});
