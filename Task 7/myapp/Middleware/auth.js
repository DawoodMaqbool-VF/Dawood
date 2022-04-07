const express = require('express')
const jwt = require('jsonwebtoken')

exports.verifyToken = async function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
        jwt.verify(req.token, 'jwtprivatekey', (err, authData) => {
        if(err) {
          next(err)
        }});
      next();
    } else {
      // Forbidden
      res.status(401).send("Unauthorized Access");
    }
  }