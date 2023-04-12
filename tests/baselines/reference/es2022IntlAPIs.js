//// [es2022IntlAPIs.ts]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#using_timezonename
const timezoneNames = ['short', 'long', 'shortOffset', 'longOffset', 'shortGeneric', 'longGeneric'] as const;
for (const zoneName of timezoneNames) {
  var formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    timeZoneName: zoneName,
  });
}


//// [es2022IntlAPIs.js]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#using_timezonename
const timezoneNames = ['short', 'long', 'shortOffset', 'longOffset', 'shortGeneric', 'longGeneric'];
for (const zoneName of timezoneNames) {
    var formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        timeZoneName: zoneName,
    });
}
