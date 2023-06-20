import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const ErrorComponent = ({ errorMessage }) => {
  return (
    <View style={errorMessage ? styles.containerWithError : styles.container}>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {

  },
  containerWithError: {
    borderWidth: 1,
    borderColor: '#FF0000',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    width: 330,
  },

  errorMessageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
  },
});
export default ErrorComponent;