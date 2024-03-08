//// [tests/cases/conformance/es2018/es2018IntlAPIs.ts] ////

//// [es2018IntlAPIs.ts]
// Sample from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf
const locales = ['ban', 'id-u-co-pinyin', 'de-ID'];
const options = { localeMatcher: 'lookup' } as const;
console.log(Intl.PluralRules.supportedLocalesOf(locales, options).join(', '));

const [ part ] = new Intl.NumberFormat().formatToParts();
console.log(part.type, part.value);


//// [es2018IntlAPIs.js]
// Sample from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf
const locales = ['ban', 'id-u-co-pinyin', 'de-ID'];
const options = { localeMatcher: 'lookup' };
console.log(Intl.PluralRules.supportedLocalesOf(locales, options).join(', '));
const [part] = new Intl.NumberFormat().formatToParts();
console.log(part.type, part.value);
