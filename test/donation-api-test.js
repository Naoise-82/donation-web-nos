"use strict";

const assert = require("chai").assert;
const DonationService = require("./donation-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Donation API tests", function () {
    let donations = fixtures.donations;
    let newCandidate = fixtures.newCandidate;

    const donationService = new DonationService(fixtures.donationService);

    setup(async function () {
        donationService.deleteAllCandidates();
        donationService.deleteAllDonations();
    });

    teardown(async function () {
        
    });

    test("create a donation", async function () {
        const returnedCandidate = await donationService.createCandidate(newCandidate);
        await donationService.makeDonation(returnedCandidate._id, donations[0]);
        const returnedDonations = await donationService.getDonations(returnedCandidate._id);
        assert.equal(returnedDonations.length, 1);
        assert(_.some([returnedDonations[0]], donations[0]), "returned donation must be a superset of donation");
      });
});