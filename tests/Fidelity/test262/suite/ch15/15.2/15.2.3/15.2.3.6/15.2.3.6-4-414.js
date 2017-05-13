/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-414.js
 * @description ES5 Attributes - Inherited property whose [[Enumerable]] attribute is set to true is enumerable (Object.create)
 */


function testcase() {
        var appointment = new Object();

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
            !teamMeeting.hasOwnProperty("conferenceCall");

        return hasOwnProperty && verifyTimeProp && verifyNameProp && verifyCallProp;
    }
runTestCase(testcase);
