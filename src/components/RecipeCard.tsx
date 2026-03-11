import { View, Text, TouchableOpacity, Image } from 'react-native'; // <-- Image tem de estar aqui!
import { useNavigation } from '@react-navigation/native';

export interface RecipeCardProps {
  id: string;
  name: string;
  imageUrl: string;
  ingredientsText: string;
}

export default function RecipeCard({ id, name, imageUrl, ingredientsText }: RecipeCardProps) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Crafting', { recipeId: id })}
      style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', borderColor: '#383838', borderWidth: 2, borderRadius: 8, padding: 15, marginBottom: 15, width: '90%' }}
    >
      <Image 
        // A MÁGICA ESTÁ AQUI: Ele descobre sozinho se é um link ou um arquivo da pasta!
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
        style={{ width: 45, height: 45, resizeMode: 'contain', marginRight: 15 }} 
      />
      
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#ffbb00', fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{name}</Text>
        <Text style={{ color: '#888888', fontSize: 14 }}>{ingredientsText}</Text>
      </View>
    </TouchableOpacity>
  );
}