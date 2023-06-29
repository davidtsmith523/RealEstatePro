import * as react from 'react';
import { View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
// import HTML from 'react-native-render-html';

export default function InfoScreen( {navigation}) {
//   const bulletPointContent = `
//   <ul>
//     <li>This is the first bullet point.</li>
//     <li>This is the second bullet point.</li>
//     <li>This is the third bullet point.</li>
//   </ul>
//   `;
  const handleLinkPress = () => {
    Linking.openURL('https://www.whitecoatinvestor.com/real-estate-professional-status-reps/');
  };

  return (
    <ScrollView style={styles.scrollViewStyle}>
    <View style={styles.container}>
      {/* Properties */}
      <View style={styles.infoWrapper}>
        <Text style={styles.sectionTitle}>Real Estate Professional Status Information</Text>
        <Text style={styles.disclaimer}>This information is for demonstration pruposes only. If you want to learn more about Real Estate, please contact an accountant or Real Estate Lawyer</Text>
        <Text style={styles.subTitle}>Real Estate Professional Status Requirements</Text>
        <Text style={styles.paragraph}>1. 750 Rule</Text>
        <Text style={styles.paragraph}>2. 50% or more profressional hours in Real Estate</Text>
        <Text style={styles.paragraph}>3. Material Participation</Text>
        <Text style={styles.subTitle}>1. 750 Rule</Text>
        <Text style={styles.paragraph}>You must spend 750 hours or more in real estate during the tax year</Text>
        <Text style={styles.subTitle}>What counts as Real Estate Hours?</Text>
        <Text style={styles.paragraph}>- Property Development and redevelopment</Text>
        <Text style={styles.paragraph}>- Construction and reconstructions</Text>
        <Text style={styles.paragraph}>- Acquisition and conversion of properties</Text>
        <Text style={styles.paragraph}>- Property rentals and management</Text>
        <Text style={styles.paragraph}>- Operations</Text>
        <Text style={styles.paragraph}>- Leasing or brokerage trade or business</Text>
        <Text style={styles.subTitle}>2. 50% or more profressional hours in Real Estate</Text>
        <Text style={styles.paragraph}>This means that if you have a job, you must log more real estate hours than you regular job.</Text>
        <Text style={styles.paragraph}>The caviat here is that if your are married, then one person can have a regular job and work as much as they want. The other person has to just spend the 750 hours and material participate to qualify as real estate profressional status</Text>


        {/* <HTML source={{ html: bulletPointContent }}/> */}
        <Text style={styles.subTitle}>3. Material Participation</Text>
        <Text style={styles.paragraph}>There are 7 tests that the IRS uses</Text>
        <Text style={styles.paragraph}>1. You participated in the activity for more than 500 hours.</Text>
        <Text style={styles.paragraph}>2. Your participation was substantially all the participation in the activity of all individuals for the tax year, including the participation of individuals who did not own any interest in the activity.</Text>
        <Text style={styles.paragraph}>3. You participated in the activity for more than 100 hours during the tax year, and you participated at least as much as any other individual (including individuals who did not own any interest in the activity) for the year.</Text>
        <Text style={styles.paragraph}>4. The activity is a significant participation activity, and you participated in all significant participation activities for more than 500 hours. A significant participation activity is any trade or business activity in which you participated for more than 100 hours during the year and in which you did not materially participate under any of the material participation tests, other than this test.</Text>
        <Text style={styles.paragraph}>5. You materially participated in the activity (other than by meeting this fifth test) for any five (whether or not consecutive) of the 10 immediately preceding tax years.</Text>
        <Text style={styles.paragraph}>6. The activity is a personal service activity in which you materially participated for any three (whether or not consecutive) preceding tax years. An activity is a personal service activity if it involves the performance of personal services in the fields of health (including veterinary services), law, engineering, architecture, accounting, actuarial science, performing arts, consulting, or any other trade or business in which capital is not a material income-producing factor.</Text>
        <Text style={styles.paragraph}>7. Based on all the facts and circumstances, you participated in the activity on a regular, continuous, and substantial basis during the year.</Text>
        <Text style={styles.paragraph} onPress={handleLinkPress}>
          Credit to <Text style={styles.blueTag}>whitecoatinvestor.com</Text> for the information
        </Text>
        <Text style={styles.subTitle}>What does this mean?</Text>
        <Text style={styles.paragraph}>It means you are actively involved in managing Real Estate investments.</Text>
        <Text style={styles.paragraph}>Ex. Repairs, Improvements, Management Decisions, Hiring, Cleaning</Text>
        <Text style={styles.subTitle}>Summary</Text>
        <Text style={styles.subTitle}>How to Qualify for Real Estate Professional Status?</Text>
        <Text style={styles.paragraph}>1. Over 50% of your personal services during the tax year were in real estate business</Text>
        <Text style={styles.paragraph}>2. Work 750 hours or more during the tax year in real estate</Text>
        <Text style={styles.paragraph}>3. Over 50% of these hours are Material Participation</Text>
        <Text style={styles.disclaimer}>These are only for suggestion purposes. Please consult an accountant if any other questions</Text>



      </View>
    </View>
    </ScrollView>

  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  infoWrapper:{
    paddingTop: 30,
    paddingHorizontal: 20,
    // paddingBottom: 80,
    paddingBottom: 10,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingTop: 22,
    color: '#FF0000',
    textAlign: 'center',
  },
  blueTag: {
    paddingTop: 10,
    fontSize: 12,
    color: 'dodgerblue'
  },
  // scrollViewStyle: {
  //   paddingBottom: 30,
  // },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 22,
  },
  paragraph: {
    fontSize: 12,
    paddingTop: 10,
  },
});