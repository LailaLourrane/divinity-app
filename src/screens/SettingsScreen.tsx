import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NOVIDADE: Importando o nosso atalho do idioma
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsScreen({ navigation }: any) {
  // Puxando as ferramentas do Dicionário
  const { t, toggleLanguage, lang } = useLanguage();

  const handleDeleteProgress = () => {
    Alert.alert(
      "Delete Progress",
      "Are you sure you want to delete all your inventory? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@minha_mochila');
              Alert.alert("Success", "Your inventory has been wiped out!");
            } catch (error) {
              console.log("Erro", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', paddingTop: 50 }}>
      
      {/* CABEÇALHO DINÂMICO */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%', marginBottom: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
          <Ionicons name="chevron-back" size={32} color="#E0E0E0" />
        </TouchableOpacity>
        <Text style={{ color: '#E0E0E0', fontSize: 36, fontWeight: 'bold' }}>
          {t('settingsTitle')} {/* Título traduzido! */}
        </Text>
      </View>

      <View style={{ paddingHorizontal: '5%', gap: 15 }}>
        
        {/* BOTÃO DE IDIOMA CONECTADO */}
        <TouchableOpacity 
          onPress={toggleLanguage} 
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D0D0D0', padding: 15, borderRadius: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="globe-outline" size={28} color="#555555" style={{ marginRight: 15 }} />
            <Text style={{ color: '#555555', fontSize: 20, fontWeight: 'bold' }}>
              {t('changeLang')} {/* Texto traduzido! */}
            </Text>
          </View>
          {/* Mostra qual o idioma atual no cantinho do botão */}
          <Text style={{ color: '#888888', fontSize: 14, fontWeight: 'bold' }}>
            {t('currentLang')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteProgress} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D0D0D0', padding: 15, borderRadius: 15 }}>
          <Ionicons name="trash-outline" size={28} color="#CC0000" style={{ marginRight: 15 }} />
          <Text style={{ color: '#CC0000', fontSize: 20, fontWeight: 'bold' }}>
            {t('deleteProg')} {/* Texto traduzido! */}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}