## ⛩ **Google Spreadsheet Randomizer**
This cool app you made uses Node.js to grab random stuff from your Google Sheets. Just toss in the sheet ID, and boom, it grabs random data like magic dice! It uses special tricks to make sure everything's fair and unpredictable, like a super-shuffler. So if you need random picks for quizzes, tasks, or anything fun, this app's your new best friend! It's like sprinkling randomness on your boring data, making things exciting and fair again.

### **`Engine Requirement 🚜`**
```
  -- Node.js v18.x or v20.x
  -- NPM v8+
```

### **`Install Localy 🧑🏼‍🔧`**
1. `npm install`  
1. rename `.env.example` into `.env` (`cp .env.example .env`)
1. `npm start`

### **`Using API`**
```sh
curl http://localhost:3000/api/random?sheet_id=1ccc0UszBM6NUnuV_w8C_4NHAQO3uvqJ6JodPeYJzDhc
```
```json
 {
   "success": true,
   "message": "success",
   "validation": {
   
   },
   "data": {
     "document": {
       "spreadsheet_id": "1ccc0UszBM6NUnuV_w8C_4NHAQO3uvqJ6JodPeYJzDhc",
       "title": "Testing Public",
       "sheet": "Sheet1",
       "total": 26
     },
     "random": {
       "random_number": 4,
       "timestamp": "1/22/2018 16:51:36",
       "name": "John Doe",
       "email": "someone@gmail.com",
       "phone": "0842194214175"
     }
   }
 }
```

ps: You can specify sheet name
```sh
curl http://localhost:3000/api/random?sheet_id=1ccc0UszBM6NUnuV_w8C_4NHAQO3uvqJ6JodPeYJzDhc&sheet_name=customsheetname
```