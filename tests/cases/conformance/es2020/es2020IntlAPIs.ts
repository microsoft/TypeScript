// @target: es2020

const locale = new Intl.Locale('en');
const mixed = [ 'en', locale ] as const;

Intl.Locale(); // expect error
new Intl.Locale(); // expect error
new Intl.Locale(locale, { caseFirst: 'upper', hourCycle: 'h23' });

Intl.RelativeTimeFormat('en'); // expect error
new Intl.RelativeTimeFormat('en');
new Intl.RelativeTimeFormat(locale);
new Intl.RelativeTimeFormat(mixed);
new Intl.RelativeTimeFormat('en', { numeric: 'always', style: 'narrow' }).resolvedOptions();
new Intl.RelativeTimeFormat().format(123, 'days');
new Intl.RelativeTimeFormat().formatToParts(456, 'month')[0];

const { notation, style } = new Intl.NumberFormat('en', { numberingSystem: 'arab' }).resolvedOptions();
const { currency, currencySign } = Intl.NumberFormat('en', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
const { unit, unitDisplay } = Intl.NumberFormat('en', { style: 'unit', unit: 'kilogram', unitDisplay: 'narrow' }).resolvedOptions();
const { compactDisplay } = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'long' }).resolvedOptions();
const { signDisplay } = Intl.NumberFormat('en', { signDisplay: 'always' }).resolvedOptions();
for (const type of [ 'compact', 'exponentInteger', 'exponentMinusSign', 'exponentSeparator', 'unit', 'unknown' ] as const) {
  Intl.NumberFormat().formatToParts(123)[0].type = type;
}

Intl.DateTimeFormat('en', { calendar: 'gregory', numberingSystem: 'latn' });
for (const type of [ 'relatedYear', 'yearName' ] as const) {
  Intl.DateTimeFormat().formatToParts()[0].type = type;
}

Intl.Collator(locale);
Intl.Collator(mixed);
new Intl.Collator(locale);
new Intl.Collator(mixed);
Intl.DateTimeFormat(locale);
Intl.DateTimeFormat(mixed);
new Intl.DateTimeFormat(locale);
new Intl.DateTimeFormat(mixed);
Intl.NumberFormat(locale);
Intl.NumberFormat(mixed);
new Intl.NumberFormat(locale);
new Intl.NumberFormat(mixed);
Intl.PluralRules(locale);
Intl.PluralRules(mixed);
new Intl.PluralRules(locale);
new Intl.PluralRules(mixed);

Intl.Collator.supportedLocalesOf(locale);
Intl.Collator.supportedLocalesOf(mixed);
Intl.DateTimeFormat.supportedLocalesOf(locale);
Intl.DateTimeFormat.supportedLocalesOf(mixed);
Intl.NumberFormat.supportedLocalesOf(locale);
Intl.NumberFormat.supportedLocalesOf(mixed);
Intl.PluralRules.supportedLocalesOf(locale);
Intl.PluralRules.supportedLocalesOf(mixed);

Intl.getCanonicalLocales(locale);
Intl.getCanonicalLocales(mixed);

Array.prototype.toLocaleString(locale);
Array.prototype.toLocaleString(mixed);

BigInt.prototype.toLocaleString(locale);
BigInt.prototype.toLocaleString(mixed);

Date.prototype.toLocaleString(locale);
Date.prototype.toLocaleString(mixed);
Date.prototype.toLocaleDateString(locale);
Date.prototype.toLocaleDateString(mixed);
Date.prototype.toLocaleTimeString(locale);
Date.prototype.toLocaleTimeString(mixed);

Number.prototype.toLocaleString(locale);
Number.prototype.toLocaleString(mixed);

String.prototype.toLocaleLowerCase(locale);
String.prototype.toLocaleUpperCase(mixed);
String.prototype.localeCompare('', locale);
String.prototype.localeCompare('', mixed);
