//// [declFileTypeofEnum.ts]

enum days {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}

var weekendDay = days.saturday;
var daysOfMonth = days;
var daysOfYear: typeof days;

//// [declFileTypeofEnum.js]
var days;
(function (days) {
    days[days["monday"] = 0] = "monday";
    days[days["tuesday"] = 1] = "tuesday";
    days[days["wednesday"] = 2] = "wednesday";
    days[days["thursday"] = 3] = "thursday";
    days[days["friday"] = 4] = "friday";
    days[days["saturday"] = 5] = "saturday";
    days[days["sunday"] = 6] = "sunday";
})(days || (days = {}));
var weekendDay = 5 /* saturday */;
var daysOfMonth = days;
var daysOfYear;


//// [declFileTypeofEnum.d.ts]
