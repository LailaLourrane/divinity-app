import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RECIPES } from '../data/recipes';
import { INGREDIENTS } from '../data/ingredients';
import { useLanguage } from '../contexts/LanguageContext';

export default function CraftingScreen({ route, navigation }: any) {
  const recipeId = route.params?.recipeId || '1';
  const recipe = RECIPES.find((r) => r.id === recipeId);
  
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedInv = await AsyncStorage.getItem('@minha_mochila');
        if (savedInv !== null) setInventory(JSON.parse(savedInv));

        const savedFavs = await AsyncStorage.getItem('@meus_favoritos');
        if (savedFavs !== null) {
          const favArray = JSON.parse(savedFavs);
          setIsFavorite(favArray.includes(recipeId));
        }
      } catch (error) {
        console.log("Erro ao carregar dados", error);
      }
    };
    loadData();
  }, [recipeId]);

  const saveInventory = async (newInventory: Record<string, number>) => {
    try {
      await AsyncStorage.setItem('@minha_mochila', JSON.stringify(newInventory));
    } catch (error) {
      console.log("Erro ao salvar inventário", error);
    }
  };

  const toggleIngredient = (id: string, requiredQty: number) => {
    setInventory((prev) => {
      const currentQty = prev[id] || 0;
      const hasEnough = currentQty >= requiredQty;
      const newQty = hasEnough ? Math.max(0, currentQty - requiredQty) : requiredQty;
      
      const newState = { ...prev, [id]: newQty };
      saveInventory(newState);
      return newState;
    });
  };

  const toggleFavorite = async () => {
    try {
      const savedFavs = await AsyncStorage.getItem('@meus_favoritos');
      let favArray = savedFavs ? JSON.parse(savedFavs) : [];
      
      if (isFavorite) {
        favArray = favArray.filter((id: string) => id !== recipeId);
      } else {
        favArray.push(recipeId);
      }
      
      await AsyncStorage.setItem('@meus_favoritos', JSON.stringify(favArray));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Erro ao salvar favorito", error);
    }
  };

  if (!recipe) return <View style={{ flex: 1, backgroundColor: '#000000' }} />;

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: 50 }}>
      
     
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '5%', marginBottom: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
            <Ionicons name="chevron-back" size={32} color="#E0E0E0" />
          </TouchableOpacity>
          <Text style={{ color: '#E0E0E0', fontSize: 36, fontWeight: 'bold' }}>
            {t('craftingTitle')}
          </Text>
        </View>
        
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? "bookmark" : "bookmark-outline"} size={32} color="#D4AF37" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: 40 }}>
        
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: '#121212', borderWidth: 2, marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
             <Image 
               source={typeof recipe.imageUrl === 'string' ? { uri: recipe.imageUrl } : recipe.imageUrl} 
               style={{ width: 90, height: 90, resizeMode: 'contain' }} 
             />
          </View>
          <Text style={{ color: '#E0E0E0', fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            {recipe.name}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {recipe.requirements.map((req, index) => {
            const ingredient = INGREDIENTS.find(ing => ing.id === req.ingredientId);
            const quantityOwned = inventory[req.ingredientId] || 0;
            const hasEnough = quantityOwned >= req.quantity;
            const statusColor = hasEnough ? '#D4AF37' : '#555555'; 

            return (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                {index > 0 && <Ionicons name="add" size={40} color="#333333" style={{ marginHorizontal: 10, marginBottom: 25 }} />}
                
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => toggleIngredient(req.ingredientId, req.quantity)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name={hasEnough ? "checkbox" : "square-outline"} size={24} color={statusColor} style={{ marginRight: 5 }} />
                    <Text style={{ color: statusColor, fontSize: 14, fontWeight: 'bold' }}>{hasEnough ? t('inBag') : t('missing')}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => toggleIngredient(req.ingredientId, req.quantity)} style={{ width: 85, height: 85, borderRadius: 15, backgroundColor: '#121212', borderColor: statusColor, borderWidth: 2, marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                    {ingredient?.imageUrl ? (
                      <Image source={typeof ingredient.imageUrl === 'string' ? { uri: ingredient.imageUrl } : ingredient.imageUrl} style={{ width: 55, height: 55, resizeMode: 'contain' }} />
                    ) : (
                      <Text style={{ fontSize: 30 }}>❓</Text>
                    )}
                  </TouchableOpacity>
                  
                  <Text style={{ color: '#888888', fontSize: 12, fontStyle: 'italic', textAlign: 'center', width: 90 }}>{ingredient?.name}</Text>
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}