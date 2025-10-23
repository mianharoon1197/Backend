//works only for emulator android
const SERVER = 'http://10.0.2.2:1197';

//snd data to db
export const sendData = async (data: any) => {
  try {
    const response = await fetch(`${SERVER}/submitData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log('Server Response: ', res);
    return res;
  } catch (error) {
    console.log('Error Sending Data To Db: ', error);
  }
};

//get data from db
export const getUsers = async () => {
  try {
    const response = await fetch(`${SERVER}/getData`);
    const data = await response.json();
    console.log('Data Fetched: ', data);
    return data;
  } catch (error) {
    console.log('Error Getting Users From Db: ', error);
    return [];
  }
};

//delete user from db
export const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`${SERVER}/deleteData/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log('User Deleted: ', result);
    return result;
  } catch (error) {
    console.log('Error Deleting User From Db: ', error);
  }
};
