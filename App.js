import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from './src/Store';
import GetItems from './src/screens/Items'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { store } = configureStore();
const Stack = createNativeStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="items" component={GetItems} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
