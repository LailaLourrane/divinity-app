import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      // Vai para a Home e não volta mais para cá
      navigation.replace('Home');
    });
    
  // AQUI: A lista vazia garante que a animação só roda uma vez na vida!
  }, []); 

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image 
        source={require('../../assets/IconeApp.png')} 
        style={{
          width: 150,
          height: 150,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        }}
        resizeMode="contain"
      />
    </View>
  );
}