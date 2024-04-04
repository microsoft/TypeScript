//// [tests/cases/conformance/es2018/es2018IntlAPIs.ts] ////

//// [es2018IntlAPIs.ts]
Intl.PluralRules();
new Intl.PluralRules();
new Intl.PluralRules('en');
new Intl.PluralRules([ 'en' ] as const);
const { pluralCategories } = Intl.PluralRules('en', { localeMatcher: 'best fit', type: 'ordinal' }).resolvedOptions();
Intl.PluralRules().select(10);
Intl.PluralRules.supportedLocalesOf('en');
Intl.PluralRules.supportedLocalesOf([ 'en', 'de' ] as const, { localeMatcher: 'lookup' });

const { hourCycle } = Intl.DateTimeFormat('en', { hourCycle: 'h23' }).resolvedOptions();

new Intl.NumberFormat().formatToParts()[0];


//// [es2018IntlAPIs.js]
Intl.PluralRules();
new Intl.PluralRules();
new Intl.PluralRules('en');
new Intl.PluralRules(['en']);
const { pluralCategories } = Intl.PluralRules('en', { localeMatcher: 'best fit', type: 'ordinal' }).resolvedOptions();
Intl.PluralRules().select(10);
Intl.PluralRules.supportedLocalesOf('en');
Intl.PluralRules.supportedLocalesOf(['en', 'de'], { localeMatcher: 'lookup' });
const { hourCycle } = Intl.DateTimeFormat('en', { hourCycle: 'h23' }).resolvedOptions();
new Intl.NumberFormat().formatToParts()[0];
