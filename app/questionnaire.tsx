import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Switch } from 'react-native';

export default function QuestionnaireScreen() {
  // User input storage
  const [geoRegion, setGeoRegion] = useState('');
  const [length, setLength] = useState('');
  const [purpose, setPurpose] = useState('');
  const [allInclusive, setAllInclusive] = useState(false);
  const [airport, setAirport] = useState('');
  const [flightTime, setFlightTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // submit button pressed
  const handleSubmit = () => {
    // This is when the submit button is pressed, send the data to the api here, idk how :p
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      {!submitted ? (
        <>
          <Text style={styles.title}>Travel Questionnaire</Text>

          {/* Geo Region Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Geo Region:</Text>
            <TextInput
              style={styles.textInput}
              value={geoRegion}
              onChangeText={setGeoRegion}
              placeholder="Enter the geo region"
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Length of Stay Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Length of Stay (in days):</Text>
            <TextInput
              style={styles.textInput}
              value={length}
              onChangeText={setLength}
              placeholder="Enter the length of stay"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
            />
          </View>

          {/* Purpose Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Purpose of Visit:</Text>
            <TextInput
              style={styles.textInput}
              value={purpose}
              onChangeText={setPurpose}
              placeholder="Enter the purpose of visit"
              placeholderTextColor="#ccc"
            />
          </View>

          {/* All Inclusive Field (True/False) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>All Inclusive?</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>{allInclusive ? 'Yes' : 'No'}</Text>
              <Switch
                value={allInclusive}
                onValueChange={setAllInclusive}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={allInclusive ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Airport Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nearest Airport:</Text>
            <TextInput
              style={styles.textInput}
              value={airport}
              onChangeText={setAirport}
              placeholder="Enter the nearest airport"
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Flight Time Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Flight Time (hours):</Text>
            <TextInput
              style={styles.textInput}
              value={flightTime}
              onChangeText={setFlightTime}
              placeholder="Enter the flight time"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
            />
          </View>

          {/* Submit Button */}
          <Button title="Submit" onPress={handleSubmit} />
        </>
      ) : (
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>Thank you for your responses!</Text>
          <Text style={styles.summaryText}>Geo Region: {geoRegion}</Text>
          <Text style={styles.summaryText}>Length of Stay: {length} days</Text>
          <Text style={styles.summaryText}>Purpose of Visit: {purpose}</Text>
          <Text style={styles.summaryText}>All Inclusive: {allInclusive ? 'Yes' : 'No'}</Text>
          <Text style={styles.summaryText}>Nearest Airport: {airport}</Text>
          <Text style={styles.summaryText}>Flight Time: {flightTime} hours</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#333', // Grey background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White text title
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff', // White text labels
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    color: '#fff', // White text input
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#fff', // White text for switch label
  },
  thankYouContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff', // White text summary
  },
});
