//// [useRegexpGroups.ts]
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
let result = re.exec("2015-01-02");

let date = result[0];

let year1 = result.groups.year;
let year2 = result[1];

let month1 = result.groups.month;
let month2 = result[2];

let day1 = result.groups.day;
let day2 = result[3];

let foo = "foo".match(/(?<bar>foo)/)!.groups.foo;

//// [useRegexpGroups.js]
var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
var result = re.exec("2015-01-02");
var date = result[0];
var year1 = result.groups.year;
var year2 = result[1];
var month1 = result.groups.month;
var month2 = result[2];
var day1 = result.groups.day;
var day2 = result[3];
var foo = "foo".match(/(?<bar>foo)/).groups.foo;
