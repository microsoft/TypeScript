//// [tests/cases/conformance/es2021/es2021LocalesObjectArgument.ts] ////

//// [es2021LocalesObjectArgument.ts]
const enUS = new Intl.Locale("en-US");
const deDE = new Intl.Locale("de-DE");
const jaJP = new Intl.Locale("ja-JP");

new Intl.ListFormat(enUS);
new Intl.ListFormat([deDE, jaJP]);
Intl.ListFormat.supportedLocalesOf(enUS);
Intl.ListFormat.supportedLocalesOf([deDE, jaJP]);


//// [es2021LocalesObjectArgument.js]
const enUS = new Intl.Locale("en-US");
const deDE = new Intl.Locale("de-DE");
const jaJP = new Intl.Locale("ja-JP");
new Intl.ListFormat(enUS);
new Intl.ListFormat([deDE, jaJP]);
Intl.ListFormat.supportedLocalesOf(enUS);
Intl.ListFormat.supportedLocalesOf([deDE, jaJP]);
