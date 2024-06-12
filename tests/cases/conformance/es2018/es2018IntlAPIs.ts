// @target: es2018

Intl.PluralRules(); // expect error
new Intl.PluralRules();
new Intl.PluralRules('en');
new Intl.PluralRules([ 'en' ] as const);
const { pluralCategories } = new Intl.PluralRules('en', { localeMatcher: 'best fit', type: 'ordinal' }).resolvedOptions();
new Intl.PluralRules().select(10);
Intl.PluralRules.supportedLocalesOf('en');
Intl.PluralRules.supportedLocalesOf([ 'en', 'de' ] as const, { localeMatcher: 'lookup' });

const { hourCycle } = Intl.DateTimeFormat('en', { hourCycle: 'h23' }).resolvedOptions();

new Intl.NumberFormat().formatToParts()[0];
