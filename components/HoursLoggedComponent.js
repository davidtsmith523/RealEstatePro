import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HoursLoggedComponent = (props) => {
  const handleDeleteProperty = () => {
    props.onDelete();
    console.log('here');
  };

  return (
    <TouchableOpacity>
      <View style={styles.property}>
        <View style={styles.propertyLeft}>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Property: </Text>1234 West Star Street</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Material Participation: </Text>Yes</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Description: </Text>I raked up the yard that was full of leaves. I also painted a dresser and mopped around the house for new tenets</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Date: </Text>June 4, 2023 </Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteProperty()}>
          <Ionicons style={styles.trashcan} name={'trash'} size={14} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  property: {
    backgroundColor: '#ffff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start', // Adjust vertical alignment as needed
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  propertyLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trashcan: {
    width: 14,
    height: 14,
  },
  boldText: {
    fontWeight: 'bold',
  }
});

export default HoursLoggedComponent;
