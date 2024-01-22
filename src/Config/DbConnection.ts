import mongoose from "mongoose";


export default (database: string) => {
  const connect = () => {
    mongoose
      .connect(database)
      .then(() => console.log(`Database connection successful.....`))
      .catch((error) => {
        console.log("Unable to connect to the db: " + error.message);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnected", () => {
    console.log(`Db disconnected`);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};