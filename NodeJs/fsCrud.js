const fs = require('fs')

//creating a new file with text
//fs.writeFileSync('files/hello.txt','Hello Im Harry')

//deletinhg file
//fs.unlinkSync('files/fruits.txt')

//reading file data
//const data = fs.readFileSync('files/hello.txt','utf-8')
//console.log(data)

//updating dataa
// fs.appendFileSync('files/hello.txt','How are you Harry')

// const data2 = fs.readFileSync('files/hello.txt','utf-8')
// console.log(data2)

const operation = process.argv[2]//as first 2(0,1) args are file paths 

if(operation=='write'){
   const name= process.argv[3] 
   const content= process.argv[4] 
   const fullName = 'files/'+name+'.txt'
   fs.writeFileSync(fullName,content)
   console.log('File Created')
}
else if(operation=='read'){
   const name= process.argv[3] 
  // const content= process.argv[4] 
   const fullName = 'files/'+name+'.txt'
   const data = fs.readFileSync(fullName,'utf-8')
   console.log(data)
}
else if(operation=='update'){
   const name= process.argv[3] 
   const content= process.argv[4] 
   const fullName = 'files/'+name+'.txt'
   fs.appendFileSync(fullName,content)
   console.log('File Updated')
}
else if(operation=='delete'){
   const name= process.argv[3] 
   const fullName = 'files/'+name+'.txt'
   fs.unlinkSync(fullName)
   console.log('File Deleted')
}
else{
    console.log('Operation not found')
}