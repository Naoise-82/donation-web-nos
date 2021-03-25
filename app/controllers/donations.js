'use strict';

const Donation = require("../models/donation");
const { populate } = require("../models/user");
const User = require("../models/user");
const Candidate = require("../models/candidate");

const Donations = {

  home: {
    handler: async function (request, h) {
      const candidates = await Candidate.find().lean();
      return h.view("home", { title: "Make a Donation", candidates: candidates });
    },
  },

  report: {
    handler: async function (request, h) {
      const donations = await Donation.find().populate("donor").populate("candidate").lean();
      return h.view("report", {
        title: "Donations to Date",
        donations: donations,
      });
    },
  },

  donate: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newDonation = new Donation({
          amount: data.amount,
          method: data.method,
          firstName: user.firstName,
          donor: user._id
        });
        await newDonation.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  }
};

module.exports = Donations;