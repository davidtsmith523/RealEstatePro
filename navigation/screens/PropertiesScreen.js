import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard, Button, Alert, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Property from '../../components/Property';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddHoursModal from '../../components/AddHoursModal';
import {createTable, addPropertyDB, deletePropertyDB } from '../../components/PropertiesDB';
import RealEstateProgressBars from '../../components/RealEstateProgressBars';

export default function PropertiesScreen( {navigation}) {
  useEffect(() => {
    createTable();
  }, []);
  const [property, setProperty] = useState();
  const [selectedProperty, setSelectedProperty] = useState();
  const [propertyItems, setPropertyItems] = useState([]);
  // New Modal
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (userSelectedProperty) => {
    // setSelectedProperty(userSelectedProperty);
    console.log(userSelectedProperty);
    setSelectedProperty(userSelectedProperty);
    setModalVisible(true);
    // return (<AddHoursModal visible={modalVisible} selectedProperty={userSelectedProperty} closeModal={closeModal} />);

  };
  
  const closeModal = () => {
    setModalVisible(false);
    // setProperty(null);
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
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    {/* <ScrollView style={styles.scrollViewStyle}> */}
      {/* Properties */}
      <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.propertiesWrapper}>
        <Text style={styles.sectionTitle}>Properties</Text>
        <Text style={styles.subTitle}>Add a Property and Tap to Add Hours</Text>

        <View style={styles.properties}>
          {/* This is where the properties will go */}
          {
            propertyItems.map((property, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => openModal(property)} >
                  <Property  text={property} onDelete={() => deleteProperty(index)}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <View style={styles.progressBarsContainer}>
        <Text style={styles.generalRealEstateText}>General Real Estate Hours (#ofHours / 250)</Text>
        <View style={styles.progressBarContainer}>
            <RealEstateProgressBars style={styles.progressBar} />
        </View>
        <Text style={styles.generalRealEstateText}>Material Participation Hours (#ofHours / 500)</Text>
        <View style={styles.progressBarContainer}>
            <RealEstateProgressBars style={styles.progressBar} />
        </View>
        <Text style={styles.totalHoursText}>Total Hours (#ofHours / 750)</Text>
        <View style={styles.progressBarContainer}>
            <RealEstateProgressBars style={styles.progressBar} />
        </View>
      </View>
      </ScrollView>
      
      {/* </ScrollView> */}

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
        <AddHoursModal visible={modalVisible} selectedProperty={selectedProperty} closeModal={closeModal} />
      </View>
      {/* New Modal */}
    </View>
    
    // </TouchableWithoutFeedback>
    
    
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
    paddingBottom: 80,
    
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
    bottom: 40,
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
  scrollViewStyle: {
    // flexGrow: 1,
    
  },
  progressBarsContainer: {
    paddingBottom: 50,
  },
  progressBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  progressBar: {
    // position: 'absolute',
    // bottom: 10,
    
  },
  generalRealEstateText: {
    paddingBottom: 2,
    marginLeft: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalHoursText : {
    paddingBottom: 2,
    marginLeft: 5,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});