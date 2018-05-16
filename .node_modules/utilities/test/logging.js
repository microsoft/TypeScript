/*
 * Utilities: A classic collection of JavaScript utilities
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var assert = require('assert')
  , logger = require('../lib/log')
  , tests;
  
tests = {
      
    'test basic logging': function () {
        var oldLog = console.log;
        
        console.log = function (str) {
                assert.equal(str, "basic log");
        };
        logger.log("basic log");
        
        console.log = oldLog;
    }
,   'test info logging': function () {
        var oldinfoLog = console.info;

        console.info = function (str) {
                assert.equal(str, "info log");
        };
        logger.info("info log");
    
        console.info = oldinfoLog;
    }
,   'test warning logging': function () {
        var oldwarnLog = console.warn;

        console.warn = function (str) {
                assert.equal(str, "warn log");
        };
        logger.warn("warn log");

        console.warn = oldwarnLog;
    }    
,   'test error logging': function () {
        var oldErrorLog = console.error;
    
        console.error = function (str) {
                assert.equal(str, "error log");
        };
        logger.error("error log");
        
        console.error = oldErrorLog;
    }
}


module.exports = tests;