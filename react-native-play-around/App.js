import { Fascinate_400Regular, Jost_300Light } from '@expo-google-fonts/dev';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   Fascinate_400Regular,
  //   Jost_400Regular,
  // });

  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ Fascinate_400Regular, Jost_300Light });

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>I like that font a lot!</Text>
      <Text style={styles.subTitle}>Let's test this other font now</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Fascinate_400Regular',
  },

  subTitle: {
    fontFamily: 'Jost_300Light',
  },
});
