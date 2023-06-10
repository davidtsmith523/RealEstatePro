import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity, Alert, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Picker from 'react-native-picker-select';
import ErrorComponent from './ErrorComponent';
import { AddPropertyValuesDB } from './PropertiesDB';

const AddHoursModal = ({selectedProperty, visible, closeModal }) => {
  const [yesNoValue, setyesNoValue] = useState(null);
  const [numberValue, setnumberValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = () => {
    setErrorMessage('Please select correct values for "Hours" and "Material Participation"')
  };

  const handleCloseButtonPress = () => {
    if (yesNoValue === null && numberValue === null && (description == "" || description == null)) {
      closeModal();
    } else {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            closeModal();
          },
        },
      ],
      { cancelable: false }
    );
    // console.log("here")
    // console.log("Selected date:", date);
    // console.log("Selected hours:", numberValue);
    // console.log("Selected Material Participation:", yesNoValue);
    // closeModal();
    }
  };

  const handleAddButtonPress = () => {
    if (numberValue === null || yesNoValue === null) {
      handleErrorMessage();
    } else {
      setErrorMessage(null);
    Alert.alert(
      'Confirmation',
      `Selected date: ${date.toLocaleDateString()}\nHours: ${numberValue}\nMaterial Participation: ${yesNoValue}\nDescription: ${description}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: () => {
            AddPropertyValuesDB(date, numberValue, yesNoValue, description, selectedProperty);
            console.log("Selected property:", selectedProperty);
            console.log("Selected date:", date);
            console.log("Selected hours:", numberValue);
            console.log("Selected Material Participation:", yesNoValue);
            console.log("Selected Material Participation Description:", description);
            setDate(new Date());
            setnumberValue(null);
            setyesNoValue(null);
            setDescription(null);
            closeModal();
          },
        },
      ],
      { cancelable: false }
    );
    // console.log("here")
    // console.log("Selected date:", date);
    // console.log("Selected hours:", numberValue);
    // console.log("Selected Material Participation:", yesNoValue);
    // closeModal();
    }
  };

  return (
    <Modal animationType='slide' visible={visible}>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <View>
          {errorMessage !== null ? (
            <ErrorComponent errorMessage={'Please select correct values for "Hours" and "Material Participation"'} />
          ) : null}
        </View> */}
      <View style={styles.container}>
      <Text style={styles.titleText}>Add Real Estate Hours</Text>
        {errorMessage !== '' && <ErrorComponent errorMessage={errorMessage} />}
      <Text style={styles.numberText}>Hours</Text>
        <Picker style={styles.numberPicker}
          value={numberValue}
          onValueChange={(value) => setnumberValue(value)}
          placeholder={{ label: 'Select number of hours...', value: null }}
          items={Array.from({ length: 24 }, (_, i) => ({
            label: (i + 1).toString(),
            value: (i + 1).toString(),
          }))}
        />
        <Text style={styles.yesNoText}>Material Participation</Text>
        <View style={styles.yesNoPicker}>
        <Picker 
        value={yesNoValue}
        onValueChange={(value) => setyesNoValue(value)}
        placeholder={{ label: 'Select Yes/No...', value: null }}
        items={[
          {label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
        />
        </View>
        <Text style={styles.descriptionText}>Description</Text>
        <TextInput
          placeholder={"A description of the work..."}
          style={styles.descriptionInput}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />
        <Text style={styles.dateText}>Date</Text>
        <DateTimePicker
          style={styles.datePicker}
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
        {/* <Button style={styles.closeButton} title="Close" onPress={closeModal} /> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddButtonPress}>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </View>
            </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseButtonPress}>
              <View style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        {/* <Button style={styles.addButton} title="Add" onPress={closeModal} /> */}
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 30,
  },
  titleText: {
    paddingTop: 10,
    paddingBottom: 50,
    fontSize: 28,
    fontWeight: 'bold',
  },
  yesNoText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  yesNoPicker: {
    // width: 200,  // Set the desired width
    // height: 40,  // Set the desired height
  },
  descriptionText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },

  numberText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  numberPicker: {
    // width: 200,  // Set the desired width
    // height: 40,  // Set the desired height
  },
  dateText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePicker: {
    alignSelf: 'flex-start',
    marginLeft: -10,
    marginBottom: 20,
  },
  closeButton: {
    width: 100,
    height: 60,
    backgroundColor: '#FF0000',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  addButton: {
    width: 100,
    height: 60,
    backgroundColor: '#55BCF6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});

export default AddHoursModal;