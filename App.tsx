import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from './components/Button';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
    width: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.text}>Todo List</Text>
        <View style={styles.buttonContainer}>
          <Button text="Add Todo" onPress={() => console.log('add')} />
          <Button text="Delete Todo" onPress={() => console.log('delete')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 25, alignSelf: 'center', marginVertical: 8},
  buttonContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
