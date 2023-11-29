/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {NativeModules} from 'react-native';

const {ReloadModule} = NativeModules;

function App(): JSX.Element {
  const [startTime, setStartTime] = React.useState<number | null>(null);
  React.useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const reload = () => {
    ReloadModule.reloadIt();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>{startTime}</Text>
          <Button onPress={() => reload()} title="Reload" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
