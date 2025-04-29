import mongoose from 'mongoose';

function connectToDb(){
   mongoose.connect(process.env.DB_CONNECT || "mongodb+srv://anmoldham:RCuC7Y5vWjw4oMvd@cluster0.eawxw0q.mongodb.net/expense_app" as string).then(()=>{
    console.log('Connected to db');
   }).catch((err)=>{
    console.log(err);
   })
     
}

export default connectToDb;