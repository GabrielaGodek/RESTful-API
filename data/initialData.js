import { readFileSync } from 'fs';
import { Coffee } from "./../models/coffeeModel.js";

const initialData = JSON.parse(readFileSync('./coffeeDB.json', 'utf-8'));

const importData = async () => {
    try {
        await Coffee.create(initialData)
        console.log('Data imported')
    } catch(err) {
        console.log('error 🚩', err)
    }
    process.exit()
}

const deleteData = async () => {
    try {
        await Coffee.deleteMany()
        console.log('Data deleted')
    } catch(err) {
        console.log('error 🚩', err)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importData()
} else if(process.argv[2 === '--delete']){
    deleteData()
}

// console.log(initialData)


// console.log(process.argv)