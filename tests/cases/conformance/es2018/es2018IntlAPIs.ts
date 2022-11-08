// @target: es2018

// Sample from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf
const locales = ['ban', 'id-u-co-pinyin', 'de-ID'];
const options = { localeMatcher: 'lookup' } as const;
console.log(Intl.PluralRules.supportedLocalesOf(locales, options).join(', '));