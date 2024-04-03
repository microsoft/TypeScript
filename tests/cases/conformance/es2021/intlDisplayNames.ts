// @target: es2021

new Intl.DisplayNames(); // TypeError: invalid_argument
new Intl.DisplayNames('en'); // TypeError: invalid_argument
new Intl.DisplayNames('en', {}); // TypeError: invalid_argument
console.log((new Intl.DisplayNames(undefined, {type: 'language'})).of('en-GB')); // "British English"

const localesArg = ["es-ES", new Intl.Locale("en-US")];
console.log((new Intl.DisplayNames(localesArg, {type: 'language'})).resolvedOptions().locale); // "es-ES"
console.log(Intl.DisplayNames.supportedLocalesOf(localesArg)); // ["es-ES", "en-US"]
console.log(Intl.DisplayNames.supportedLocalesOf()); // []
console.log(Intl.DisplayNames.supportedLocalesOf(localesArg, {})); // ["es-ES", "en-US"]
