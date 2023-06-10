import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HoursLoggedComponent = (props) => {

  const handleDeleteProperty = () => {
    props.onDelete();
    console.log('here');
  }

  return (
    <TouchableOpacity>
      <View style={styles.property}>
        <View style={styles.propertyLeft}>
          <Text style={styles.propertyText}>Property</Text>
          <Text style={styles.propertyText}>Material Participation</Text>
          <Text style={styles.propertyText}>Description</Text>
          <Text style={styles.propertyText}>Date</Text>
        </View>
        {/* <View style={styles.circular}></View> */}
        <TouchableOpacity onPress={() => handleDeleteProperty()}>
        <Ionicons style={styles.trashcan} name={'trash'} size={14}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    height: 50,
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
    // flexWrap: 'wrap',
    // breakMode: 'word-wrap',
    // paddingVertical: 4, // Add vertical padding
    paddingHorizontal: 8,
  },
  trashcan: {
    width: 14,
    height: 14,
    // borderColor: '#55BCF6',
    // borderWidth: 2,
    // borderRadius: 5,
  },
});

export default HoursLoggedComponent;