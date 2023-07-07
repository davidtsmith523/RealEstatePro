import * as SQLite from 'expo-sqlite';
import React from 'react';

const db = SQLite.openDatabase('properties.db');

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, propertyName TEXT, hours INTEGER, materialParticipation TEXT, description TEXT)',
      [],
      () => {
      },
      (error) => {
        console.log('Error creating table:', error);
      }
    );
  });
};

const addPropertyDB = (property, propertyItems, setPropertyItems) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO properties (propertyName) VALUES (?)',
      [property],
      () => {
        setPropertyItems([...propertyItems, property]);
      },
      (error) => {
        console.log('Error adding property:', error);
      }
    );
  });
};

const deletePropertyDB = (deletedProperty, index, propertyItems, setPropertyItems) => {
  db.transaction((tx) => {
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


  const AddPropertyValuesDB = (date, hours, materialParticipation, description, selectedProperty) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO properties (date, hours, materialParticipation, description, propertyName) VALUES (?, ?, ?, ?, ?)',
        [date, hours, materialParticipation, description, selectedProperty],
        () => {
        },
        (error) => {
          console.log('Error adding property:', error);
        }
      );
    });
  };

const selectTotalHoursFromProperties = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT hours FROM properties WHERE hours IS NOT NULL',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => row.hours);
        callback(results);
      },
      (error) => {
        console.log('Error selecting hours from properties:', error);
        callback([]);
      }
    );
  });
};

const selectGeneralHoursFromProperties = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT hours FROM properties WHERE materialParticipation = "No"',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => row.hours);
        callback(results);
      },
      (error) => {
        console.log('Error selecting hours from properties:', error);
        callback([]);
      }
    );
  });
};

const selectMaterialParticipationHoursFromProperties = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT hours FROM properties WHERE materialParticipation = "Yes"',
      [],
      (_, { rows }) => {
        const results = rows._array.map((row) => row.hours);
        callback(results);
      },
      (error) => {
        console.log('Error selecting hours from properties:', error);
        callback([]);
      }
    );
  });
};

const getAllPropertyValuesDB = (callback) => {
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
      },
      (error) => {
        console.log('Error selecting property values:', error);
        callback([]);
      }
    );
  });
};

const deletePropertyValuesDB = (propertyName, materialParticipation, hours, description, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM properties WHERE propertyName = ? AND materialParticipation = ? AND hours = ? AND description = ? AND date = ?',
      [propertyName, materialParticipation, hours, description, date],
      () => {
      },
      (error) => {
        console.log('Error deleting property:', error);
      }
    );
  });
};

export { createTable, addPropertyDB, deletePropertyDB, AddPropertyValuesDB, selectTotalHoursFromProperties, selectGeneralHoursFromProperties, selectMaterialParticipationHoursFromProperties, getAllPropertyValuesDB, deletePropertyValuesDB, db };
