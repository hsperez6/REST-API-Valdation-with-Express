'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator');


// This array is used to keep track of user records
// as they are created.
const users = [];

// Construct a router instance.
const router = express.Router();


// GET Route that returns a list of users.
router.get('/users', (req, res) => {
  res.json(users);
});

// POST Route that creates a new user.
router.post('/users', [
  check('name')
    .exists()
    .withMessage('Please provide a value for "name'),
  check('email')
    .exists()
    .withMessage('Please provide a value for "email"')
    .isEmail()
    .withMessage('Please provide a valid email address for "email"'),
  check('birthday')
    .exists()
    .withMessage('Please provide a value for "birthday"'),
  check('password')
    .exists()
    .withMessage('Please provide a value for "password"'),
  check('confirmedPassword')
    .exists()
    .withMessage('Please provide a value for "confirmedPassword"'),
  ], (req, res) => {

    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if( !errors.isEmpty() ) {
      // Use the Array `map()` method to get a list of error messages
      const errorMessages = errors.array().map(error => error.msg);

      // Return the validation errors to the client
      res.status(400).json({ errors: errorMessages })
    } else {
      // Get the user from the request body.
      const user = req.body;

      // Add the user to the `users` array.
      users.push(user);

      // Set the status to 201 Created and end the response.
      res.status(201).end();
    };

  }

);




/* Using "nameValidationChain" variable

  const nameValidationChain = check('name')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "name"')
  ;

  // POST Route that creates a new user.
  router.post('/users', nameValidationChain, (req, res) => {

    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if( !errors.isEmpty() ) {
      // Use the Array `map()` method to get a list of error messages
      const errorMessages = errors.array().map(error => error.msg);

      // Return the validation errors to the client
      res.status(400).json({ errors: errorMessages })
    } else {
      // Get the user from the request body.
      const user = req.body;

      // Add the user to the `users` array.
      users.push(user);

      // Set the status to 201 Created and end the response.
      res.status(201).end();
    };
  });
*/


/* ORIGINAL VALIDATION

    const errors = [];

    // Validate that we have a `name` value.
    if (!user.name) {
      errors.push('Please provide a value for "name"');
    };

    // Validate that we have an `email` value.
    if (!user.email) {
      errors.push('Please provide a value for "email"');
    };

    // Validate that we have a 'password' value.
    if (!user.password) {
      errors.push('Please provide a value for "password"');
    } else if (password.length < 8 || password.length > 20) {
      errors.push('Your password should be between 8 and 20 characters');
    } else {
      user.password = bcrypt.hashSync(user.password, 10);
    };

    // If there are any errors...
    if (errors.length > 0) {
      // Return the validation errors to the client.
      res.status(400).json({ errors });
    } else {
      // Add the user to the `users` array.
      users.push(user);

      // Set the status to 201 Created and end the response.
      res.status(201).end();
    };
*/



module.exports = router;