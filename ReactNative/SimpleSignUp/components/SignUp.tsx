import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { sendData } from '../api/userapi';

function SignUp() {
  const isDarkMode = useColorScheme() === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) return Alert.alert('Validation', 'Name is required!');
    await sendData({ name, email, age });
    Alert.alert('Success', 'Data sent to backend!');
    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text style={styles.signupText}>User Form</Text>

      <View style={styles.shadowWrapper}>
        <Ionicons name="person-circle-outline" size={30} color="#7F00FF" />
        <TextInput
          style={styles.inputBox}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.shadowWrapper}>
        <Ionicons name="mail-open" size={30} color="#7F00FF" />
        <TextInput
          style={styles.inputBox}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.shadowWrapper}>
        <Ionicons name="lock-closed" size={30} color="#7F00FF" />

        <TextInput
          style={styles.inputBox}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={styles.buttontext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  signupText: {
    textAlign: 'center',
    marginBottom: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  shadowWrapper: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#7F00FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  inputBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    marginLeft: 5,
  },

  submitBtn: {
    backgroundColor: '#DF71FDFF',
    borderRadius: 50,
    padding: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttontext: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingVertical: 5,
  },
});

export default SignUp;
