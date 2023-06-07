import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard, Button, Alert, TouchableWithoutFeedback} from 'react-native';
import Property from '../../components/Property';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddHoursModal from '../../components/AddHoursModal';
import {createTable, addPropertyDB, deletePropertyDB } from '../../components/PropertiesDB';

export default function PropertiesScreen( {navigation}) {
  useEffect(() => {
    createTable();
  }, []);
  const [property, setProperty] = useState();
  const [propertyItems, setPropertyItems] = useState([]);
  // New Modal
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  // New Modal



  const handleAddProperty = () => {
    Keyboard.dismiss();
    setPropertyItems([...propertyItems, property]);
    setProperty(null);
    addPropertyDB(property, propertyItems, setPropertyItems);

    // db.transaction((tx) => {
    //   console.log(property)
    //   tx.executeSql(
    //     'INSERT INTO properties (propertyName) VALUES (?)',
    //     [property],
    //     () => {
    //       console.log('Property added successfully');
    //       setPropertyItems([...propertyItems, property]);
    //       setProperty(null);
    //     },
    //     (error) => {
    //       console.log('Error adding property:', error);
    //     }
    //   );
    // });
  }

  const deleteProperty = (index) => {
    console.log("OnPress");
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete the property?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log("Delete");
            let propertiesCopy = [...propertyItems];
            const deletedProperty = propertiesCopy[index];
            propertiesCopy.splice(index, 1);
            setPropertyItems(propertiesCopy);
            //console.log(deletedProperty)
            deletePropertyDB(deletedProperty, index, propertyItems, setPropertyItems)
            // db.transaction((tx) => {
            //   tx.executeSql(
            //     'DELETE FROM properties WHERE propertyName = ?',
            //     [deletedProperty],
            //     () => {
            //       console.log('Property deleted successfully');
            //       let propertiesCopy = [...propertyItems];
            //       propertiesCopy.splice(index, 1);
            //       setPropertyItems(propertiesCopy);
            //     },
            //     (error) => {
            //       console.log('Error deleting property:', error);
            //     }
            //   );
            // });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      {/* Properties */}
      <View style={styles.propertiesWrapper}>
        <Text style={styles.sectionTitle}>Properties</Text>
        <Text style={styles.subTitle}>Add a Property and Tap to Add Hours</Text>

        <View style={styles.properties}>
          {/* This is where the properties will go */}
          {
            propertyItems.map((property, index) => {
              return (
                <TouchableOpacity key={index} onPress={openModal} >
                  <Property  text={property} onDelete={() => deleteProperty(index)}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      {/* Write a property */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust the value based on your nee
        style={styles.writePropertyWrapper}>
          <TextInput style={styles.input} placeholder={"Add a property"} value={property} onChangeText={text => setProperty(text)}/>
          <TouchableOpacity onPress={() => handleAddProperty()} >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* New Modal */}
      <View>
        <Button title="Open Modal" onPress={openModal} />
        <AddHoursModal visible={modalVisible} closeModal={closeModal} />
      </View>
      {/* New Modal */}
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  propertiesWrapper:{
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 22,
  },
  properties: {
    marginTop: 30,
  },
  writePropertyWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#55BCF6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 34,
    color: '#fff',
  },
  
});