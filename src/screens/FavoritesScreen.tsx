import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RecipeCard from '../components/RecipeCard';
import { RECIPES } from '../data/recipes';
import { useLanguage } from '../contexts/LanguageContext';

export default function FavoritesScreen({ navigation }: any) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavs = await AsyncStorage.getItem('@meus_favoritos');
        if (savedFavs !== null) {
          setFavoriteIds(JSON.parse(savedFavs));
        } else {
          setFavoriteIds([]);
        }
      } catch (error) {
        console.log("Erro ao carregar favoritos", error);
      }
    };

    // Carrega a primeira vez que a tela abre
    loadFavorites();

    // Cria um "ouvinte" que recarrega a lista sempre que entrares neste ecrã
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const favoriteRecipes = RECIPES.filter(recipe => favoriteIds.includes(recipe.id));

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: 50 }}>
      
      {/* CABEÇALHO */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%', marginBottom: 30 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
          <Ionicons name="chevron-back" size={32} color="#E0E0E0" />
        </TouchableOpacity>
        <Text style={{ color: '#E0E0E0', fontSize: 36, fontWeight: 'bold' }}>
          {t('favoritesTitle')}
        </Text>
      </View>

      {/* LISTA DE FAVORITOS */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: 20 }}>
        {favoriteRecipes.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="bookmark-outline" size={60} color="#333333" style={{ marginBottom: 15 }} />
            <Text style={{ color: '#888888', fontSize: 16, textAlign: 'center' }}>
              {t('noItems')}
            </Text>
          </View>
        ) : (
          favoriteRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              id={recipe.id} 
              name={recipe.name} 
              imageUrl={recipe.imageUrl} 
              ingredientsText={recipe.ingredientsText} 
            />
          ))
        )}
      </ScrollView>

    </View>
  );
}