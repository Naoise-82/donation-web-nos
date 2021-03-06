"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const donationSchema = new Schema({
  amount: Number,
  method: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
  },
});

module.exports = Mongoose.model("Donation", donationSchema);