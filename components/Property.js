import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Property = (props) => {

  const handleDeleteProperty = () => {
    props.onDelete();
    console.log('here');
  }

  return (
    <View style={styles.property}>
      <View style={styles.propertyLeft}>
        <View style={styles.square}></View>
        <Text style={styles.propertyText}>{props.text}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
      <TouchableOpacity onPress={() => handleDeleteProperty()}>
      <Ionicons style={styles.trashcan} name={'trash'} size={14}/>
      </TouchableOpacity>
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
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  propertyText: {
    maxWidth: '80%',
  },
  trashcan: {
    width: 14,
    height: 14,
    // borderColor: '#55BCF6',
    // borderWidth: 2,
    // borderRadius: 5,
  },
});

export default Property;