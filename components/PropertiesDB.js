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

const db = SQLite.openDatabase('properties.db');

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
export { createTable, addPropertyDB, deletePropertyDB, db };
