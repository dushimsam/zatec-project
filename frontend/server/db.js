import mongoose from "mongoose";

mongoose.connect('mongodb+srv://root:Rca_123@baza.xivov.mongodb.net/baza?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then()

export const db = mongoose.connection
