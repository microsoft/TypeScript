//// [localesObjectArgument.ts]
const enUS = new Intl.Locale("en-US");
const deDE = new Intl.Locale("de-DE");
const jaJP = new Intl.Locale("ja-JP");

const now = new Date();
const num = 1000;
const bigint = 123456789123456789n;

now.toLocaleString(enUS);
now.toLocaleDateString(enUS);
now.toLocaleTimeString(enUS);
now.toLocaleString([deDE, jaJP]);
now.toLocaleDateString([deDE, jaJP]);
now.toLocaleTimeString([deDE, jaJP]);

num.toLocaleString(enUS);
num.toLocaleString([deDE, jaJP]);

bigint.toLocaleString(enUS);
bigint.toLocaleString([deDE, jaJP]);


//// [localesObjectArgument.js]
const enUS = new Intl.Locale("en-US");
const deDE = new Intl.Locale("de-DE");
const jaJP = new Intl.Locale("ja-JP");
const now = new Date();
const num = 1000;
const bigint = 123456789123456789n;
now.toLocaleString(enUS);
now.toLocaleDateString(enUS);
now.toLocaleTimeString(enUS);
now.toLocaleString([deDE, jaJP]);
now.toLocaleDateString([deDE, jaJP]);
now.toLocaleTimeString([deDE, jaJP]);
num.toLocaleString(enUS);
num.toLocaleString([deDE, jaJP]);
bigint.toLocaleString(enUS);
bigint.toLocaleString([deDE, jaJP]);
