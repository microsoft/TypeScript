/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-590.js
 * @description ES5 Attributes - Inherited property is enumerable (Object.create)
 */


function testcase() {
        var appointment = {};

        var data1 = 1001;
        Object.defineProperty(appointment, "startTime", {
            get: function () {
                return data1;
            },
            set: function (value) {
                data1 = value;
            },
            enumerable: true,
            configurable: true
        });
        var data2 = "NAME";
        Object.defineProperty(appointment, "name", {
            get: function () {
                return data2;
            },
            set: function (value) {
                data2 = value;
            },
            enumerable: true,
            configurable: false
        });

        var meeting = Object.create(appointment);
        var data3 = "In-person meeting";
        Object.defineProperty(meeting, "conferenceCall", {
            get: function () {
                return data3;
            },
            set: function (value) {
                data3 = value;
            },
            enumerable: true,
            configurable: false
        });

        var teamMeeting = Object.create(meeting);

        var verifyTimeProp = false;
        var verifyNameProp = false;
        var verifyCallProp = false;
        for (var p in teamMeeting) {
            if (p === "startTime") {
                verifyTimeProp = true;
            }
            if (p === "name") {
                verifyNameProp = true;
            }
            if (p === "conferenceCall") {
                verifyCallProp = true;
            }
        }

        var hasOwnProperty = !teamMeeting.hasOwnProperty("name") &&
            !teamMeeting.hasOwnProperty("startTime") &&
            !teamMeeting.hasOwnProperty('conferenceCall');

        return hasOwnProperty && verifyTimeProp && verifyNameProp && verifyCallProp;
    }
runTestCase(testcase);
