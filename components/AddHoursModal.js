import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity, Alert, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ErrorComponent from './ErrorComponent';
import { AddPropertyValuesDB } from './PropertiesDB';
import SelectDropdown from 'react-native-select-dropdown';

const AddHoursModal = ({selectedProperty, visible, closeModal }) => {
  const [yesNoValue, setyesNoValue] = useState(null);
  const [numberValue, setnumberValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = () => {
    if (numberValue === null) {
      setErrorMessage('Hours must be entered');
    } else if (yesNoValue == null) {
      setErrorMessage('Material Participation must be entered');
    } else if (description == "" || description == null) {
      setErrorMessage('Description must be entered');
    }

  };

  const handleCloseButtonPress = () => {
    if (yesNoValue === null && numberValue === null && (description == "" || description == null)) {
      setDate(new Date());
      setnumberValue(null);
      setyesNoValue(null);
      setDescription(null);
      setErrorMessage(null);
      setShowDatePicker(false);
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
            setDate(new Date());
            setnumberValue(null);
            setyesNoValue(null);
            setDescription(null);
            setErrorMessage(null);
            closeModal();
          },
        },
      ],
      { cancelable: false }
    );
    }
  };

  const handleAddButtonPress = () => {
    if (numberValue === null || yesNoValue === null || description == null) {
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
            AddPropertyValuesDB(date.toLocaleDateString(), numberValue, yesNoValue, description, selectedProperty);
            setDate(new Date());
            setnumberValue(null);
            setyesNoValue(null);
            setDescription(null);
            setErrorMessage(null);
            closeModal();
          },
        },
      ],
      { cancelable: false }
    );
    }
  };
  

  return (
    <Modal animationType='slide' visible={visible}>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Text style={styles.titleText}>Add Real Estate Hours</Text>
        {errorMessage !== '' && <ErrorComponent errorMessage={errorMessage} />}
      <Text style={styles.numberText}>Hours</Text>
      <SelectDropdown
        data={Array.from({ length: 24 }, (_, index) => String(index + 1))}
        defaultButtonText="Select number of hours..."
        onSelect={(itemValue) => setnumberValue(itemValue)}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item) => item}
        buttonStyle={styles.numberPicker}
        buttonTextStyle={styles.numberPickerText}
        dropdownStyle={styles.dropdown}
      />
        <Text style={styles.yesNoText}>Material Participation</Text>
        <View style={styles.yesNoPicker}>
            <SelectDropdown
            data={[
              'Yes', 'No'
            ]}
            defaultButtonText="Select Yes/No..."
            onSelect={(itemValue) => setyesNoValue(itemValue)}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            buttonStyle={styles.numberPicker}
            buttonTextStyle={styles.numberPickerText}
            dropdownStyle={styles.dropdown}
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
          {Platform.OS === 'ios' && (
            <>
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
            </>
          )}
          {Platform.OS === 'android' && (
            <>
              <TouchableOpacity
                style={styles.openDateButton}
                onPress={() => setShowDatePicker(true)}
              >
              <Text style={{ color: 'white', textAlign: 'center' }}>Press to Select Date</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  is24hour={true}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    setDate(selectedDate);
                    
                  }}
                />
              )}
            </>
          )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCloseButtonPress}>
            <View style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddButtonPress}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 110,
    marginLeft: 30,
  },
  titleText: {
    paddingBottom: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },
  yesNoText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  // yesNoPicker: {
  //   // width: 200,  // Set the desired width
  //   // height: 40,  // Set the desired height
  // },
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
  dateText: {
    paddingTop: 10,
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
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  numberPicker: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  numberPickerText: {
    color: 'black',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  descriptionInput: {
    width: 275,
    fontSize: 16,
  },
  openDateButton: {
    width: 200, 
    backgroundColor: '#0096FF', 
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  }

});

export default AddHoursModal;