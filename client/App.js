import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Text from "./src/components/text/Text";
import spacing from "./src/theme/spacing";
import HomeScreen from "./src/screens/HomeScreen";
import RestaurentScreen from "./src/screens/RestaurentScreen";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import FlashMessage from "react-native-flash-message";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import CreateProfile from "./src/screens/CreateProfile";
import Profile from "./src/screens/Profile";

const firebaseConfig = {
  apiKey: "AIzaSyB8C5vz-3B81GTKZAt3hJWHi4TbhQavELc",
  authDomain: "lifco-bd.firebaseapp.com",
  projectId: "lifco-bd",
  storageBucket: "lifco-bd.appspot.com",
  messagingSenderId: "764143828230",
  appId: "1:764143828230:web:b66e095b4a3f16f4ee7287",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   signOut(auth);
  // });

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscription;
  }, []);

  const [loaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });
  if (!loaded) {
    return <Text>Font is loading...</Text>;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          <ActivityIndicator color="blue" size="large" />;
        </Text>
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            // returning user true
            <>
              {/* <Stack.Screen
                name="CreateProfile"
                options={{ headerShown: false }}
              >
                {(props) => <CreateProfile {...props} user={user} />}
              </Stack.Screen> */}
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <HomeScreen {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Profile" options={{ headerShown: false }}>
                {(props) => <Profile {...props} user={user} />}
              </Stack.Screen>

              <Stack.Screen
                name="Restaurent"
                component={RestaurentScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            // returning user false --> new user
            <>
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}
