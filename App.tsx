import React from 'react';
import {StyleSheet, View} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {store} from './src/redux/store';
import './translate';

function App(): React.JSX.Element {
  let persistor = persistStore(store);

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
