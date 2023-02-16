import mongoose from "mongoose"

const topicSchema = new mongoose.Schema()

export const Club = mongoose.model("Club", topicSchema);
export const Question = mongoose.model("Question", topicSchema);
