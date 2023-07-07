import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Property = (props) => {

  const handleDeleteProperty = () => {
    props.onDelete();
  }
  const handleAddProperty = () => {
    props.onPress();
  }

  return (
    
    <View style={styles.property}>
      <TouchableOpacity style={styles.test2} onPress={() => handleAddProperty()}>
      <View style={styles.propertyLeft}>
      
        <View style={styles.square}></View>
        <Text style={styles.propertyText}>{props.text}</Text>
        
      </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={styles.test} onPress={() => handleDeleteProperty()}>
          <Ionicons style={styles.trashcan} name={'trash'} size={20}/>
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  property: {
    backgroundColor: '#ffff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  propertyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    aspectRatio: 1,
    backgroundColor: 'lightcoral',
    opacity: 0.4,
    borderRadius: 15,
    marginRight: 15,
  },
  propertyText: {
    maxWidth: '80%',
  },
  trashcan: {
    width: 20,
    height: 20,

  },
  test2: {
    backgroundColor: 'transparent',
    width: 275,
  }
});

export default Property;