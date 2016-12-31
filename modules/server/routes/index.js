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
 * modules/server/routes/index.js
 *
 * Functions controlling routes for the index html code
 *
 * GET intro -
 * GET index - Render home page
*********************************************************************/
'use strict';

var express = require('express');
var router  = express.Router();

/*********************************************************************
 * GET index - Render home page
*********************************************************************/
router.get('/index*', function(req, res, next) {
  res.redirect('/');
});

/*********************************************************************
 * GET buckets - list all storj buckets
*********************************************************************/
router.get('/buckets', function(req, res, next) {
  var client = req.client;

  client.getBuckets(function(err, buckets) {
    if (err) {
      // Handle error on failure.
      console.log('error', err.message);
    }

    if (!buckets.length) {
      console.log('warn', 'You have not created any buckets.');
    }

    // Log out info for each bucket
    buckets.forEach(function(bucket) {
      console.log(
        'info',
        'ID: %s, Name: %s, Storage: %s, Transfer: %s',
        [bucket.id, bucket.name, bucket.storage, bucket.transfer]
      );
    });

    res.json(buckets);
  })
});

/*********************************************************************
 * GET files - List all files in each bucket
*********************************************************************/
router.get('/files', function(req, res, next) {
  var client = req.client;

  var filelist = new Object();
  filelist.buckets = [];

  client.getBuckets(function(err, buckets) {
    if (err) {
      // Handle error on failure.
      console.log('error', err.message);
    }

    if (!buckets.length) {
      console.log('warn', 'You have not created any buckets.');
    }

    buckets.forEach(function(bucket) {
      var bucketid = bucket.id;
      var abucket = {bucketid: bucketid,
                     bucketname: bucket.name,
                     files: []};

      client.listFilesInBucket(bucketid, function(err, files) {
        if (err) {
          console.log('error', err.message);
        }
        if (!files.length) {
          console.log('warn', 'There are no files in this bucket.');
        }

        files.forEach(function(file) {
          console.log('info',
          'Name: %s, Type: %s, Size: %s bytes, ID: %s',
          [file.filename, file.mimetype, file.size, file.id]
          );
          abucket.files.push({id: file.id, name: file.filename});
        });
      });
      filelist.buckets.push(abucket);
    });
    res.json(filelist);
  });
});

module.exports = router;
