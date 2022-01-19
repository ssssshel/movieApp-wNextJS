import mongoose from "mongoose";

const URI_MONGO = process.env.URI_MONGO

if(!URI_MONGO){
  throw new Error(
    'Por favor defina las variables de entorno en .env.local'
  )
}

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO, {
      bufferCommands: false,
    })
    console.log("Success DB connection")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDb

// CONNECT CON CACHE

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */

// let cached = global.mongoose

// if(!cached){
//   cached = global.mongoose = {conn: null, promise: null}
// }

// async function dbConnect() {

//   if(cached.conn){
//     return cached.conn
//   }

//   if(!cached.promise){
//     const options = {
//       useNewUrlParser: true, 
//       useUnifiedTopology: true
//     }

//     cached.promise = mongoose.connect(URI_MONGO, options)
//     .then((mongoose) => {
//       return mongoose
//     })
//     console.log('Conectado a MongoDb')
//   }

//   cached.conn = await cached.promise
//   return cached.conn
// }

// export default dbConnect