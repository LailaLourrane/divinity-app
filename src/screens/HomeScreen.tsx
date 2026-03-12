import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 

import RecipeCard from '../components/RecipeCard';
import { RECIPES } from '../data/recipes';
import FilterModal from '../components/FilterModal';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomeScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  // NOVIDADE: A memória da nossa categoria ativa
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { t } = useLanguage();

  
  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: 50 }}>
      
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', marginBottom: 20 }}>
        <Text style={{ color: '#E0E0E0', fontSize: 36, fontWeight: 'bold' }}>{t('homeTitle')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Inventory')}><FontAwesome5 name="box" size={24} color="#E0E0E0" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}><Ionicons name="bookmark" size={28} color="#E0E0E0" /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}><Ionicons name="settings-sharp" size={28} color="#E0E0E0" /></TouchableOpacity>
        </View>
      </View>

      
      <View style={{ paddingHorizontal: '5%', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', borderColor: '#504f53', borderWidth: 2, borderRadius: 8, paddingHorizontal: 15 }}>
          <Ionicons name="search" size={20} color="#888888" style={{ marginRight: 10 }} />
          <TextInput 
            placeholder={t('searchRecipe')}
            placeholderTextColor="#888888"
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, paddingVertical: 12, color: '#E0E0E0', fontSize: 16 }}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}><Ionicons name="close-circle" size={20} color="#888888" /></TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{ backgroundColor: '#D0D0D0', padding: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', marginHorizontal: 5 }}>
          <Text style={{ color: '#000000', fontSize: 12, fontWeight: 'bold' }}>{t('advancedFilters')}</Text>
        </TouchableOpacity>
      </View>

      
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={{ color: '#888888', fontSize: 12, paddingHorizontal: '5%', marginBottom: 15, textAlign: 'center', letterSpacing: 2 }}>
          {t('recentCrafts')}
        </Text>
        
        <View style={{ alignItems: 'center' }}>
          {filteredRecipes.length === 0 ? (
             <Text style={{ color: '#888888', marginTop: 20 }}>{t('noItems')}</Text>
          ) : (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} imageUrl={recipe.imageUrl} ingredientsText={recipe.ingredientsText} />
            ))
          )}
        </View>
      </ScrollView>

     
      <FilterModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        activeCategory={activeCategory} // Passamos a memória
        onSelectCategory={(category) => {
          setActiveCategory(category); // Atualiza a categoria
          setIsModalVisible(false);    // Fecha o modal automaticamente para um UX melhor!
        }}
      />
    </View>
  );
}