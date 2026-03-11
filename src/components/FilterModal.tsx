import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';

// NOVIDADE: O Modal agora recebe a categoria ativa e uma função para a alterar
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function FilterModal({ visible, onClose, activeCategory, onSelectCategory }: FilterModalProps) {
  const { t } = useLanguage();

  // Mapeamos os nomes traduzidos para os IDs reais do nosso banco de dados
  const categories = [
    { label: t('filterAll'), value: 'All' },
    { label: t('filterFoods'), value: 'Food' },
    { label: t('filterPotions'), value: 'Potion' },
    { label: t('filterRunes'), value: 'Rune' },
    { label: t('filterArrows'), value: 'Arrow' },
    { label: t('filterGrenades'), value: 'Grenade' },
    { label: t('filterScrolls'), value: 'Scroll' }
  ];

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%' }}>
        
        <View style={{ width: '100%', backgroundColor: '#0f0f0f', borderRadius: 20, padding: 20, borderWidth: 2, borderColor: '#1A1A1A' }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ color: '#E0E0E0', fontSize: 28, fontWeight: 'bold' }}>
              {t('filterModalTitle')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={40} color="#E0E0E0" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((cat, index) => {
              // Verifica se este botão é o que está selecionado atualmente
              const isSelected = activeCategory === cat.value;

              return (
                <TouchableOpacity 
                  key={index} 
                  // NOVIDADE: Ao clicar, avisa a Home da nova categoria!
                  onPress={() => onSelectCategory(cat.value)}
                  style={{ 
                    backgroundColor: isSelected ? '#D4AF37' : '#121212',
                    borderColor: isSelected ? '#D4AF37' : '#838383',
                    borderWidth: 2, 
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 20, 
                    marginBottom: 10,
                    marginHorizontal: 5
                  }} 
                >
                  <Text style={{ color: isSelected ? '#000000' : '#E0E0E0', fontWeight: 'bold' }}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

        </View>
      </View>
    </Modal>
  );
}