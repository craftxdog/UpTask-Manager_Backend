import { mongoose } from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING,
    );
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB is connected in: ${url}`);
  } catch (error) {
    console.log(`error: ${error.menssage}`);
    process.exit(1);
  }
}
export default dbConnection;
