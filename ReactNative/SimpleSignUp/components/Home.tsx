import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { getUsers } from '../api/userapi';
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
    const users = await getUsers();
    setData(users);
  };
  return (
    <ScrollView>
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.headerText]}>ID</Text>
          <Text style={[styles.cell, styles.headerText]}>Name</Text>
          <Text style={[styles.cell, styles.headerText]}>Email</Text>
          <Text style={[styles.cell, styles.headerText]}>Age</Text>
        </View>

        {/* Data Rows */}
        {data.map((item, index) => (
          <View key={item._id} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.email}</Text>
            <Text style={styles.cell}>{item.age}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    backgroundColor: '#222',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});

export default Home;
