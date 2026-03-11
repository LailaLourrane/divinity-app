import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'; // <-- Image adicionada!
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INGREDIENTS } from '../data/ingredients';
import { useLanguage } from '../contexts/LanguageContext';

export default function InventoryScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Owned'); 
  const [inventory, setInventory] = useState<Record<string, number>>({});
  
  const { t } = useLanguage();

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const savedData = await AsyncStorage.getItem('@minha_mochila');
        if (savedData !== null) setInventory(JSON.parse(savedData));
      } catch (error) {
        console.log("Erro", error);
      }
    };
    loadInventory();
  }, []);

  const saveInventory = async (newInventory: Record<string, number>) => {
    try {
      await AsyncStorage.setItem('@minha_mochila', JSON.stringify(newInventory));
    } catch (error) {
      console.log("Erro", error);
    }
  };

  const addQuantity = (id: string) => {
    setInventory((prev) => {
      const newState = { ...prev, [id]: (prev[id] || 0) + 1 };
      saveInventory(newState);
      return newState;
    });
  };

  const removeQuantity = (id: string) => {
    setInventory((prev) => {
      const current = prev[id] || 0;
      const newState = { ...prev, [id]: Math.max(0, current - 1) };
      saveInventory(newState);
      return newState;
    });
  };

  const filteredIngredients = INGREDIENTS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const quantity = inventory[item.id] || 0;
    if (activeTab === 'Owned') return matchesSearch && quantity > 0;
    return matchesSearch && quantity === 0;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: 50 }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
          <Ionicons name="chevron-back" size={32} color="#E0E0E0" />
        </TouchableOpacity>
        <Text style={{ color: '#E0E0E0', fontSize: 36, fontWeight: 'bold' }}>{t('inventoryTitle')}</Text>
      </View>

      <View style={{ paddingHorizontal: '5%', marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', borderColor: '#553C9A', borderWidth: 2, borderRadius: 8, paddingHorizontal: 15 }}>
          <Ionicons name="search" size={20} color="#888888" style={{ marginRight: 10 }} />
          <TextInput placeholder={t('searchIngredient')} placeholderTextColor="#888888" value={searchText} onChangeText={setSearchText} style={{ flex: 1, paddingVertical: 12, color: '#E0E0E0', fontSize: 16 }} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setActiveTab('Owned')} style={{ backgroundColor: activeTab === 'Owned' ? '#E0E0E0' : '#121212', paddingVertical: 8, paddingHorizontal: 35, borderRadius: 20, borderWidth: 2, borderColor: activeTab === 'Owned' ? '#E0E0E0' : '#1A1A1A' }}>
          <Text style={{ color: activeTab === 'Owned' ? '#000000' : '#888888', fontWeight: 'bold' }}>{t('tabOwned')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Missing')} style={{ backgroundColor: activeTab === 'Missing' ? '#E0E0E0' : '#121212', paddingVertical: 8, paddingHorizontal: 35, borderRadius: 20, borderWidth: 2, borderColor: activeTab === 'Missing' ? '#E0E0E0' : '#1A1A1A' }}>
          <Text style={{ color: activeTab === 'Missing' ? '#000000' : '#888888', fontWeight: 'bold' }}>{t('tabMissing')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: '5%', paddingBottom: 20 }}>
        {filteredIngredients.length === 0 ? (
          <Text style={{ color: '#888888', textAlign: 'center', marginTop: 20 }}>{t('noItems')}</Text>
        ) : (
          filteredIngredients.map((item) => {
            const quantity = inventory[item.id] || 0;
            return (
              <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', borderColor: '#1A1A1A', borderWidth: 2, borderRadius: 15, padding: 15, marginBottom: 15 }}>
                
                {/* A MÁGICA DA IMAGEM NA MOCHILA AQUI! */}
                {item.imageUrl ? (
                  <Image source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl} style={{ width: 40, height: 40, resizeMode: 'contain', marginRight: 15 }} />
                ) : (
                  <Text style={{ fontSize: 30, marginRight: 15 }}>❓</Text>
                )}
                
                <Text style={{ color: '#E0E0E0', fontSize: 18, fontWeight: 'bold', flex: 1 }}>{item.name}</Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#000000', borderRadius: 10, padding: 5 }}>
                  <TouchableOpacity onPress={() => removeQuantity(item.id)} style={{ paddingHorizontal: 10 }}><Ionicons name="remove" size={24} color="#888888" /></TouchableOpacity>
                  <Text style={{ color: '#D4AF37', fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 }}>{quantity}</Text>
                  <TouchableOpacity onPress={() => addQuantity(item.id)} style={{ paddingHorizontal: 10 }}><Ionicons name="add" size={24} color="#E0E0E0" /></TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}