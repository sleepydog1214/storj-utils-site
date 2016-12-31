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
 * modules/client/app/app.config.js
 *
 * Main 'sourceApp' module configuration
 *
 * angular.module.config() - Configure the templates for the source
 *                           program routes
 * angulat.module.component() - Add a component with a controller to
 *                              query the site navigation data
*********************************************************************/
'use strict';

/*********************************************************************
 * angular.module.config() - Config the $locationProvider and
 *                           $routeProvider for the 'indexApp' module.
*********************************************************************/
angular.
  module('storjApp').
    config(['$locationProvider', '$routeProvider',
            '$mdIconProvider', '$mdThemingProvider',
      function config($locationProvider, $routeProvider,
        $mdIconProvider, $mdThemingProvider) {
        // Set the app's deep linking prefix
        $locationProvider.hashPrefix('!');

        // Preload the svg icons
        $mdIconProvider.icon('menu', '../svg/ic_menu_black_24px.svg');
        $mdIconProvider.icon('bullet-1', '../svg/bullet-1.svg');
        $mdIconProvider.icon('bullet-2', '../svg/bullet-2.svg');
        $mdIconProvider.icon('bullet-3', '../svg/bullet-3.svg');

        // Set the theme
        $mdThemingProvider.theme('default')
          .primaryPalette('grey', { 'default': '300'})
          .accentPalette('indigo');

        $routeProvider.
        //Template for home page
        when('/', {
          template: '<index></index>'
        }).
        when('/index', {
          template: '<index></index>'
        }).
        when('/list-buckets', {
          template: '<list-buckets></list-buckets>'
        }).
        when('/list-files', {
          template: '<list-files></list-files>'
        }).
        when('/delete-files', {
          template: '<delete-files></delete-files>'
        }).
        otherwise('/');
      }
  ]);


/*********************************************************************
 * angular.module.component() - Add a component to control the
 * site-wide data.
*********************************************************************/
angular.
  module('storjApp').
    component('site', {
      templateUrl: 'app.template.html',
      controller: ['$location', '$mdSidenav', '$mdMedia',
        function SiteController($location, $mdSidenav, $mdMedia) {
          var self = this;

          // toggleMenu() - Toggle the side bar
          self.toggleMenu = function () {
            $mdSidenav('right').toggle();
          };

          // setTitleClass() - Set the title class based on screen size.
          self.setTitleClass = function () {
            if ($mdMedia('gt-sm')) {
              return 'md-display-1';
            }
            else {
              return 'md-title';
            }
          }

          // setSubTitleClass() - Set the subtitle class based on screen size.
          self.setSubTitleClass = function () {
            if ($mdMedia('gt-sm')) {
              return 'md-headline';
            }
            else {
              return 'md-body-2';
            }
          }

          // setNavButtonClass() - Set the sidebar button class based on
          //                       whether it's selected.
          self.setNavButtonClass = function (url) {
            var currPath = $location.path();

            if (currPath === '/') {
              currPath = 'index';
            }

            if (url.search(currPath) >= 0) {
              return 'navBtnSelected';
            }
            else {
              return 'navBtn';
            }
          }
        }
      ]
    });
