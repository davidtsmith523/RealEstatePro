// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import ProgressBar from 'react-native-progress/Bar';

// function RealEstateProgressBars() {
//   return (
//       <ProgressBar progress={0.1} style={styles.progressBar} />
//   );
// }

// const styles = StyleSheet.create({
//   progressBar: {
//     width: 350,
//     height: 20,
//     color: "#6AE431",
//     borderWidth: 2,
//   },

// });

// export default RealEstateProgressBars;
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

function RealEstateProgressBars(props) {
  return (
    <View style={styles.progressBarContainer}>
      <ProgressBar progress={props.progress} style={styles.progressBar} color={'#6AE431'}height={20} width={null} borderWidth={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '90%',
    height: 20,
    backgroundColor: '#E8EAED',
    borderRadius: 10,
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderColor: '#FFFF',

  },
});

export default RealEstateProgressBars;
