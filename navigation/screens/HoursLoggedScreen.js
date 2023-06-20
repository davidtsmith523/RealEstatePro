import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// import Property from '../../components/Property';
import HoursLoggedComponent from '../../components/HoursLoggedComponent';
import { getAllPropertyValuesDB, deletePropertyValuesDB } from '../../components/PropertiesDB';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { encode } from 'base-64';


export default function HoursLoggedScreen( {fetchHours}) {
  const [properties, setProperties] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    fetchAllPropertyValues();
  }, []);


  // Might want to come up with something different here
  useFocusEffect(
    React.useCallback(() => {
      // Fetch property values when the screen gains focus
      fetchAllPropertyValues();
    }, [])
  );

  const handleDeleteProperty = (index, name, materialParticipation, hours, description, date) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this property and its values?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deletePropertyValuesDB(name, materialParticipation, hours, description, date);
            // Perform the delete operation
            const updatedProperties = [...properties];
            updatedProperties.splice(index, 1);
            setProperties(updatedProperties);
            // fetchHours();
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  const fetchAllPropertyValues = () => {
    getAllPropertyValuesDB((propertyData) => {
      setProperties(propertyData);
      // console.log("This is property data:");
      // propertyData.forEach((property) => {
        // console.log("Property Name:", property.propertyName);
        // console.log("Date:", property.date);
        // console.log("Hours:", property.hours);
        // console.log("Material Participation:", property.materialParticipation);
        // console.log("Description:", property.description);
      // });

      const filteredProperties = propertyData.filter((property) => property.hours !== null);

      const sortedProperties = filteredProperties.sort((a, b) => {
        const dateA = new Date(formatDate(a.date));
        // console.log(dateA)
        const dateB = new Date(formatDate(b.date));
        return dateA - dateB;
      });

      function formatDate(dateString) {
        const [month, day, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      // console.log(sortedProperties);
      setProperties(sortedProperties);

    });
  };

  const exportToExcel = async () => {
    try {
      const csvData = convertToCSV(properties);
      const fileUri = `${FileSystem.documentDirectory}properties.csv`;

      await FileSystem.writeAsStringAsync(fileUri, csvData, { encoding: FileSystem.EncodingType.UTF8 });

      const base64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

      Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Property Data',
        UTI: 'public.comma-separated-values-text',
        base64,
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  const convertToCSV = (data) => {
    const header = ['Name', 'Date', 'Hours', 'Material Participation', 'Description'];
    const rows = data.map((property) => [
      property.propertyName,
      property.date,
      property.hours,
      property.materialParticipation,
      property.description,
    ]);

    const csvArray = [header, ...rows];
    let csvContent = '';

    csvArray.forEach((rowArray) => {
      const row = rowArray.join(',');
      csvContent += `${row}\r\n`;
    });

    return csvContent;
  };

  

  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text
    //     onPress={() => navigation.navigate('Properties')}
    //     style={{ fontSize: 20, fontWeight: 'bold' }}>Hours Logged Screen</Text>
    // </View>
    <ScrollView style={styles.container}>
      <View style={styles.propertiesWrapper}>
        <Text style={styles.sectionTitle}>Hours Logged</Text>
        <Text style={styles.year}>2023</Text>
        <Text style={styles.month}>June</Text>
        <View style={styles.properties}>
        {properties.map((property, index) => (
          <HoursLoggedComponent
          key={index}
          index={index}
          name={property.propertyName}
          date={property.date}
          hours={property.hours}
          materialParticipation={property.materialParticipation}
          description={property.description}
          onDelete={handleDeleteProperty}
        />
        ))}
          {/* This is where the properties will go */}
          {/* {
            propertyItems.map((property, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => openModal(property)} >
                  <Property  text={property} onDelete={() => deleteProperty(index)}/>
                </TouchableOpacity>
              )
            })
          } */}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={exportToExcel}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Export to Excel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  year: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 22,
  },
  month: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  properties: {
    marginTop: 30,
  },
  addWrapper: {
    width: 240,
    height: 55,
    backgroundColor: '#55BCF6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 15,
    color: '#fff',
    // fontWeight: 'bold',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
});