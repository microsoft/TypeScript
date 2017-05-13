/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-413.js
 * @description ES5 Attributes - Successfully add a property to an object when the object's prototype has a property with the same name and [[Writable]] set to true (Object.create)
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
        teamMeeting.name = "Team Meeting";
        var dateObj = new Date("10/31/2010 08:00");
        teamMeeting.startTime = dateObj;
        teamMeeting.conferenceCall = "4255551212";

        var hasOwnProperty = teamMeeting.hasOwnProperty("name") &&
            teamMeeting.hasOwnProperty("startTime") &&
            teamMeeting.hasOwnProperty('conferenceCall');

        return hasOwnProperty && teamMeeting.name === "Team Meeting" &&
            teamMeeting.startTime === dateObj &&
            teamMeeting.conferenceCall === "4255551212";
    }
runTestCase(testcase);
