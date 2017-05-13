/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-588.js
 * @description ES5 Attributes - [[Get]] field of inherited property of [[Prototype]] internal property is correct (Object.create)
 */


function testcase() {
        var appointment = {};

        var data1 = 1001;
        Object.defineProperty(appointment, "startTime", {
            get: function () {
                return data1;
            },
            enumerable: true,
            configurable: false
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
            configurable: true
        });

        var meeting = Object.create(appointment);
        var data3 = "In-person meeting";
        Object.defineProperty(meeting, "conferenceCall", {
            get: function () {
                return data3;
            },
            enumerable: true,
            configurable: false
        });

        var teamMeeting = Object.create(meeting);

        var hasOwnProperty = !teamMeeting.hasOwnProperty("name") &&
            !teamMeeting.hasOwnProperty("startTime") &&
            !teamMeeting.hasOwnProperty('conferenceCall');

        return hasOwnProperty && teamMeeting.name === "NAME" &&
            teamMeeting.startTime === 1001 &&
            teamMeeting.conferenceCall === "In-person meeting";
    }
runTestCase(testcase);
