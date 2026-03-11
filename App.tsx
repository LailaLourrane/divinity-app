import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './src/contexts/LanguageContext';
// 1. Importando as 6 portas (telas) que você acabou de criar!
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import CraftingScreen from './src/screens/CraftingScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// 2. Criando o nosso "Corredor" de navegação (Pilha de telas)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // O Dicionário abraçando tudo!
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Crafting" component={CraftingScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}