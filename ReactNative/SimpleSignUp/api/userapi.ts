  //works only for emulator android
const SERVER = 'http://10.0.2.2:1197';
  
  export const sendData = async (data:any) => {
    try {
      const response = await fetch(`${SERVER}/submitData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data}),
      });
      const res = await response.json();
      console.log('Server Response: ', res);
    } catch (error) {
      console.log('Error: ', error);
    }
    
  };