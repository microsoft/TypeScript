/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-412.js
 * @description ES5 Attributes - [[Value]] field of inherited property of [[Prototype]] internal property is correct(Object.create)
 */


function testcase() {
        var appointment = {};

        Object.defineProperty(appointment, "startTime", {
            value: 1001,
            writable: true,
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(appointment, "name", {
            value: "NAME",
            writable: true,
            enumerable: true,
            configurable: true
        });

        var meeting = Object.create(appointment);
        Object.defineProperty(meeting, "conferenceCall", {
            value: "In-person meeting",
            writable: true,
            enumerable: true,
            configurable: true
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
