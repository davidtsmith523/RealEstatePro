// import * as SQLite from 'expo-sqlite';
// // import {openDatabase, SQLiteDatabase, enablePromise} from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase('properties.db');

// const createTable = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, propertyName TEXT, hours INTEGER, materialParticipation TEXT, description TEXT)',
//       [],
//       () => {
//         console.log('Table created successfully');
//       },
//       (error) => {
//         console.log('Error creating table:', error);
//       }
//     );
//   });
// };
// export { createTable, db};
import * as SQLite from 'expo-sqlite';
import React from 'react';
import { View, Text, Modal } from 'react-native';


const db = SQLite.openDatabase('properties.db');
// const propertiesArray = [];

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, propertyName TEXT, hours INTEGER, materialParticipation TEXT, description TEXT)',
      [],
      () => {
        console.log('Table created successfully');
      },
      (error) => {
        console.log('Error creating table:', error);
      }
    );
  });
};

const addPropertyDB = (property, propertyItems, setPropertyItems) => {
  db.transaction((tx) => {
    console.log(property)
    tx.executeSql(
      'INSERT INTO properties (propertyName) VALUES (?)',
      [property],
      () => {
        console.log('Property added successfully');
        setPropertyItems([...propertyItems, property]);
      },
      (error) => {
        console.log('Error adding property:', error);
      }
    );
  });
};

// const deleteProperty = (deletedProperty, propertyItems, setPropertyItems) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'DELETE FROM properties WHERE propertyName = ?',
//       [deletedProperty],
//       () => {
//         console.log('Property deleted successfully');
//         const updatedProperties = propertyItems.filter(
//           (property) => property !== deletedProperty
//         );
//         setPropertyItems(updatedProperties);
//       },
//       (error) => {
//         console.log('Error deleting property:', error);
//       }
//     );
//   });
// };
const deletePropertyDB = (deletedProperty, index, propertyItems, setPropertyItems) => {
  db.transaction((tx) => {
    console.log(deletedProperty);
    tx.executeSql(
      'DELETE FROM properties WHERE propertyName = ?',
      [deletedProperty],
        () => {
          console.log('Property deleted successfully');
          let propertiesCopy = [...propertyItems];
          propertiesCopy.splice(index, 1);
          setPropertyItems(propertiesCopy);
        },
        (error) => {
          console.log('Error deleting property:', error);
        }
      );
    });
  };


  const AddPropertyValuesDB = (date, numberValue, yesNoValue, description, selectedProperty) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE properties SET date = ?, hours = ?, materialParticipation = ?, description = ? WHERE propertyName = ?',
        [date, numberValue, yesNoValue, description, selectedProperty],
        () => {
          console.log(`${date}, ${numberValue}, ${yesNoValue}, ${description} updated for ${selectedProperty}`);
        },
        (error) => {
          console.log('Error updating property:', error);
        }
      );
    });
  };

const selectTotalHoursFromProperties = (callback) => {
  console.log("in function");
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT hours FROM properties WHERE hours IS NOT NULL',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => row.hours);
        callback(results);
        console.log(results);
      },
      (error) => {
        console.log('Error selecting hours from properties:', error);
        callback([]);
      }
    );
  });
};

const selectGeneralHoursFromProperties = (callback) => {
  console.log("in function");
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT hours FROM properties WHERE materialParticipation = "no"',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => row.hours);
        callback(results);
        console.log(results);
      },
      (error) => {
        console.log('Error selecting hours from properties:', error);
        callback([]);
      }
    );
  });
};

const selectMaterialParticipationHoursFromProperties = (callback) => {
  console.log("in function");
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT hours FROM properties WHERE materialParticipation = "yes"',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => row.hours);
        callback(results);
        console.log(results);
      },
      (error) => {
        console.log('Error selecting hours from properties:', error);
        callback([]);
      }
    );
  });
};

const getAllPropertyValuesDB = (callback) => {
  console.log("here")
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT propertyName, date, hours, materialParticipation, description FROM properties',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => ({
          propertyName: row.propertyName,
          date: row.date,
          hours: row.hours,
          materialParticipation: row.materialParticipation,
          description: row.description,
        }));
        callback(results);
        console.log("Got all property data");
      },
      (error) => {
        console.log('Error selecting property values:', error);
        callback([]);
      }
    );
  });
};


export { createTable, addPropertyDB, deletePropertyDB, AddPropertyValuesDB, selectTotalHoursFromProperties, selectGeneralHoursFromProperties, selectMaterialParticipationHoursFromProperties, getAllPropertyValuesDB, db };
