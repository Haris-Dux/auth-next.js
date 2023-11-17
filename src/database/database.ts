import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connecteed',() => {
            console.log("connected to MongoDB");
        });
        connection.on("error", (error) => {
            console.log(`Error connecting to MongoDB`+error);
            process.exit();
        })
    } catch (error) {
        console.log('something went wrong',error)
    }
}