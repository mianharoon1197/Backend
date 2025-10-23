import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getUsers, deleteUser } from '../api/userapi';

interface UserData {
  _id: string;
  name: string;
  email: string;
  age: string;
}

const Home = () => {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await getUsers();
      setData(users);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleUpdate = (id: string) => {
    Alert.alert('Update', `You clicked update for user ID: ${id}`);
    // 🧠 TODO: Navigate to Update screen or open modal here
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(id);
              console.log('Deleted user:', id);
              setData(data.filter(item => item._id !== id));
            } catch (error) {
              console.log('Error deleting user:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User List</Text>

      {data.length === 0 ? (
        <Text style={styles.noData}>No users found.</Text>
      ) : (
        data.map(item => (
          <View key={item._id} style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Email: {item.email}</Text>
              <Text style={styles.detail}>Age: {item.age}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.updateBtn]}
                onPress={() => handleUpdate(item._id)}
              >
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteBtn]}
                onPress={() => handleDelete(item._id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#222',
  },
  noData: {
    textAlign: 'center',
    color: '#555',
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  info: {
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 8,
  },
  updateBtn: {
    backgroundColor: '#007bff',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
