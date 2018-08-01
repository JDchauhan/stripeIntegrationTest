'use strict';
var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

function errorHandler(err, res) {
  switch (err.type) {
    case 'StripeCardError':
      // A declined card error
      res.send("StripeCardError", err.message); // => e.g. "Your card's expiration year is invalid."
      break;
    case 'RateLimitError':
      // Too many requests made to the API too quickly
      res.send("RateLimitError");
      break;
    case 'StripeInvalidRequestError':
      // Invalid parameters were supplied to Stripe's API
      res.send("StripeInvalidRequestError")
      break;
    case 'StripeAPIError':
      // An error occurred internally with Stripe's API
      res.send("StripeAPIError")
      break;
    case 'StripeConnectionError':
      // Some kind of error occurred during the HTTPS communication
      res.send("StripeConnectionError")
      break;
    case 'StripeAuthenticationError':
      // You probably used an incorrect API key
      res.send("StripeAuthenticationError")
      break;
    default:
      // Handle any other types of unexpected errors
      res.send(err);
      break;
  }
}

module.exports = function (app) {

  app.get("/createCust", function (req, res) {
    stripe.customers.create({
      description: 'Customer for jenny.rosen@example.com',
      source: "tok_amex" // obtained with Stripe.js
    }, function (err, customer) {
      if (err)
        return errorHandler(err, res);
      res.send(customer);
    });
  });

  app.get("/viewCust", function (req, res) {
    stripe.customers.retrieve(
      "cus_DKwkGDEIlSO5w2",
      function (err, customer) {
        if (err)
          return errorHandler(err, res);
        res.send(customer);
      }
    );
  });

  app.get("/createSubscription", function (req, res) {
    stripe.subscriptions.create({
      customer: "cus_DKwkGDEIlSO5w2",
      plan: "plan_DKwuZLp8k6beFY",
    }, function (err, subscription) {
      if (err)
        return errorHandler(err, res);
      res.send(subscription);
    });
  });

  app.get("/createPlan", function (req, res) {
    stripe.plans.create({
      amount: 5000,
      interval: "month",
      product: {
        name: "Gold special"
      },
      currency: "usd",
    }, function (err, plan) {
      if (err)
        return errorHandler(err, res);
      res.send(plan);
    });
  });

  app.get('*', function (req, res) {
    console.log("error_get");
    res.send("no api found");
    //res.render("home");
  });

};
