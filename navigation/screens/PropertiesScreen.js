import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Keyboard, Alert, ScrollView, TouchableOpacity} from 'react-native';
import Property from '../../components/Property';
import AddHoursModal from '../../components/AddHoursModal';
import {createTable, addPropertyDB, deletePropertyDB, selectTotalHoursFromProperties, selectGeneralHoursFromProperties, selectMaterialParticipationHoursFromProperties, getAllPropertyValuesDB } from '../../components/PropertiesDB';
import RealEstateProgressBars from '../../components/RealEstateProgressBars';

export default function PropertiesScreen( {navigation}) {
  const [totalHours, setTotalHours] = useState([]);
  const [generalHours, setGeneralHours] = useState([]);
  const [materialParticipationHours, setMaterialParticipationHours] = useState([]);
  // const [propertyNames, setPropertyNames] = useState([]);
  const [property, setProperty] = useState();
  const [propertyItems, setPropertyItems] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    fetchPropertyNames();

    // console.log("here5");
  }, []);

  useEffect(() => {
    console.log("wow")
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHours();
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    console.log("UseEffect");
    fetchTotalHoursFromProperties();
    fetchGeneralHoursFromProperties();
    fetchMaterialParticipationHoursFromProperties();
  });

  function fetchHours() {
    fetchTotalHoursFromProperties();
    fetchGeneralHoursFromProperties();
    fetchMaterialParticipationHoursFromProperties();
  };

  const fetchPropertyNames = () => {
    getAllPropertyValuesDB((results) => {
      // const names = results.map((property) => property.propertyName);
      const uniqueNames = [...new Set(results.map((property) => property.propertyName))];
      setPropertyItems(uniqueNames);
      // setPropertyItems(names);
      // console.log(uniqueNames)
    });
  };
  
  
  const fetchTotalHoursFromProperties = () => {
    selectTotalHoursFromProperties((hoursArray) => {
      setTotalHours(hoursArray.reduce((a, b) => a + b, 0));
      
    });
  };

  const fetchGeneralHoursFromProperties = () => {
    selectGeneralHoursFromProperties((hoursArray) => {
      setGeneralHours(hoursArray.reduce((a, b) => a + b, 0));
      // console.log(`General Hours: ${generalHours}`);
    });
  };

  const fetchMaterialParticipationHoursFromProperties = () => {
    selectMaterialParticipationHoursFromProperties((hoursArray) => {
      setMaterialParticipationHours(hoursArray.reduce((a, b) => a + b, 0));
    });
  };

  // useEffect(() => {
  //   // Retrieve General Hours from the database
  //   selectGeneralHoursFromProperties((hoursArray) => {
  //     setGeneralHours(hoursArray.reduce((a, b) => a + b, 0));
  //   });
  // }, [selectGeneralHoursFromProperties]);

  // useEffect(() => {
  //   // Retrieve Material Participation Hours from the database
  //   selectMaterialParticipationHoursFromProperties((hoursArray) => {
  //     setMaterialParticipationHours(hoursArray.reduce((a, b) => a + b, 0));
  //   });
  // }, [selectMaterialParticipationHoursFromProperties]);

  const openModal = (userSelectedProperty) => {
    console.log("herere")
    console.log(userSelectedProperty);
    setSelectedProperty(userSelectedProperty);
    setModalVisible(true);
    

  };
  
  const closeModal = () => {
    setModalVisible(false);
    // setProperty(null);
  };
  // New Modal



  const handleAddProperty = () => {
    console.log("here1")
    // console.log(`This is property: ${property}`);
    if (property === null || property === undefined) {
      Alert.alert(
        'Null Property',
        'Property cannot be null',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    } else {
      Keyboard.dismiss();
      setPropertyItems([...propertyItems, property]);
      setProperty(null);
      addPropertyDB(property, propertyItems, setPropertyItems);
      fetchTotalHoursFromProperties();
      fetchGeneralHoursFromProperties();
      fetchMaterialParticipationHoursFromProperties();
    }
    

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
            deletePropertyDB(deletedProperty, index, propertyItems, setPropertyItems);
            fetchTotalHoursFromProperties();
            fetchGeneralHoursFromProperties();
            fetchMaterialParticipationHoursFromProperties();
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
                //<TouchableOpacity style={styles.propertyBox} key={index} onPress={() => openModal(property)} >
                  <View key={index}>
                  <Property text={property} onPress={() => openModal(property)} onDelete={() => deleteProperty(index)}/>
                  </View>
                //</TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <View style={styles.progressBarsContainer}>
        <Text style={styles.generalRealEstateText}>General Real Estate Hours</Text>
        <Text style={styles.hoursSubheading}>{generalHours} / 250 hours</Text>
        <View style={styles.progressBarContainer}>
            <RealEstateProgressBars progress={generalHours / 250} style={styles.progressBar} />
        </View>
        <Text style={styles.generalRealEstateText}>Material Participation Hours</Text>
        <Text style={styles.hoursSubheading}>{materialParticipationHours} / 500 hours</Text>

        <View style={styles.progressBarContainer}>
            <RealEstateProgressBars progress={materialParticipationHours / 500} style={styles.progressBar} />
        </View>
        <Text style={styles.totalHoursText}>Total Hours</Text>
        <Text style={styles.hoursSubheading}>{totalHours} / 750 hours</Text>

        <View style={styles.progressBarContainer}>
          <RealEstateProgressBars progress={totalHours / 750} style={styles.progressBar} />
        </View>
      </View>
      </ScrollView>
      
      {/* </ScrollView> */}

      {/* Write a property */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
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
        {/* <Button title="Open Modal" onPress={openModal} /> */}
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
  propertyBox: {
    backgroundColor: 'black',
    
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
    backgroundColor: 'lightcoral',
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
    paddingBottom: 85,
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
  hoursSubheading: {
    paddingBottom: 2,
    marginLeft: 5,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
});