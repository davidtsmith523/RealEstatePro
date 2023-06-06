import * as react from 'react';
import { View, Text } from 'react-native';

export default function HoursLoggedScreen( {navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.navigate('Properties')}
        style={{ fontSize: 20, fontWeight: 'bold' }}>Hours Logged Screen</Text>
    </View>
  );
}