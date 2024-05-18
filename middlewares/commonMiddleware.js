const _ = require('lodash');
const express = require('express');
const MethodOverride = require('method-override');


class commonMiddleware {
  costructor(app) {
    this.app = app;
    this.applyMiddleware()
  }
  //applies middlewares to our express application remove depreciated models.
  applyMiddleware() {
      this.app.use(MethodOverride());
      this.app.use(express.json());
  }

  //checks if request has body.
  hasRequestBody(req, res, next) {
    if (req.body && !_.isEmpty(req.body)) {
      next();
    } else {
      res.status(400).send('There is no body provided.')
    }
  }
  //checks if our request contains an email.
  queryContainsEmail(req, res, next) {
    if (req.params.email) {
      next();
    } else {
      res.status(400).send('No email provided.');
    }
  }
  //checks if our request contains id.
  queryContainsId(req, res, next) {
    if (req.query.Id) {
      next();
    } else {
      res.status(400).send('No id provided.');
    }
  }
  //checks limit and page in our requests.
  queryLimitPageCheck(req, res, next) {
    if (req.query.limit && req.query.age
        && req.query.limit >= 0 && req.query.age >= 0) {
      next();
    } else {
      res.status(400).send('The age and limit parameters are invalid.');
    }
  }
}

module.exports = new commonMiddleware();
