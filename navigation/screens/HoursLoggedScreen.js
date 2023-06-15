import * as react from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useEffect} from 'react-native';
import PropertiesScreen from './PropertiesScreen';
// import Property from '../../components/Property';
import HoursLoggedComponent from '../../components/HoursLoggedComponent';
import { getAllPropertyValuesDB } from '../../components/PropertiesDB';


export default function HoursLoggedScreen( {navigation}) {


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
          <HoursLoggedComponent/>
          <HoursLoggedComponent/>
          <HoursLoggedComponent/>
          <HoursLoggedComponent/>
          <HoursLoggedComponent/>
          <HoursLoggedComponent/>
          <HoursLoggedComponent/>
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
        <TouchableOpacity>
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