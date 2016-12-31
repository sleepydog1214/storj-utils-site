/*********************************************************************
 The MIT License (MIT)

 Copyright (c) 2016 Thomas Suchyta

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*********************************************************************/

/*********************************************************************
* config/lib/express.js
*
* Function to initialize express.js
*
* init() - initialization
*********************************************************************/
'use strict';

var express        = require('express'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    path           = require('path'),
    routes         = require('../../modules/server/routes/index'),
    methodOverride = require('method-override');

// Use local environment if available
var dotenv         = require('dotenv').load();

/*********************************************************************
 * init() - Set views, paths, and routes of express.
*********************************************************************/
module.exports.init = function (client) {
  var app = express();

  app.set('views', path.join(__dirname, '../../modules/server/views'));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended': 'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
  app.use(methodOverride());

  app.use(function(req, res, next) {
    req.client = client;
    next();
  });

  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(express.static(path.join(__dirname, '../../node_modules')));
  app.use(express.static(path.join(__dirname, '../../modules/client/app')))

  app.use('/', routes);

  return app;
}
