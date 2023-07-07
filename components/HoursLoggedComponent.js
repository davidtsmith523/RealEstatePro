import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HoursLoggedComponent = (props) => {
  const handleDeleteProperty = () => {
    props.onDelete(props.index, props.name, props.materialParticipation, props.hours, props.description, props.date);
  };

  return (
    <View>
      <View style={styles.property}>
        <View style={styles.propertyLeft}>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Property: </Text>{props.name}</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Material Participation: </Text>{props.materialParticipation}</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Hours: </Text>{props.hours}</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Description: </Text>{props.description}</Text>
          <Text style={styles.propertyText}><Text style={styles.boldText}>Date: </Text>{props.date}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteProperty()}>
          <Ionicons style={styles.trashcan} name={'trash'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  property: {
    backgroundColor: '#ffff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    width: 20,
    height: 20,
  },
  boldText: {
    fontWeight: 'bold',
  }
});

export default HoursLoggedComponent;
