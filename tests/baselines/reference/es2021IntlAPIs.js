//// [tests/cases/conformance/es2021/es2021IntlAPIs.ts] ////

//// [es2021IntlAPIs.ts]
const locale = new Intl.Locale('en');
const mixed = [ 'en', locale ] as const;

Intl.DisplayNames(); // expect error
new Intl.DisplayNames(); // expect error
new Intl.DisplayNames('en'); // expect error
new Intl.DisplayNames('en', {}); // expect error
new Intl.DisplayNames('en', { type: 'region' });
new Intl.DisplayNames(locale, { type: 'region' });
new Intl.DisplayNames(mixed, { type: 'region' });
const { style, type } = new Intl.DisplayNames('en', { style: 'long', type: 'language' }).resolvedOptions();
new Intl.DisplayNames('en', { type: 'currency', fallback: 'none' }).of('EUR');
Intl.DisplayNames.supportedLocalesOf(locale, { localeMatcher: 'best fit' });

Intl.ListFormat(); // expect error
new Intl.ListFormat();
new Intl.ListFormat('en');
new Intl.ListFormat(locale);
new Intl.ListFormat(mixed);
const { style: style2, type: type2 } = new Intl.ListFormat('en', { style: 'short', type: 'disjunction' }).resolvedOptions();
new Intl.ListFormat('en').format([ 'foo', 'bar' ]);
new Intl.ListFormat('en').formatToParts(new Set<string>().values())[0];
Intl.DisplayNames.supportedLocalesOf(locale, { localeMatcher: 'lookup' });

const { dateStyle, timeStyle, dayPeriod, fractionalSecondDigits } = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long', dayPeriod: 'narrow', fractionalSecondDigits: 3 }).resolvedOptions();
new Intl.DateTimeFormat().formatToParts(10)[0].type = 'fractionalSecond';
new Intl.DateTimeFormat().formatRange(new Date(0), new Date());
new Intl.DateTimeFormat().formatRangeToParts(1000, 1000000000)[0].source;

new Intl.Collator('en', { collation: 'emoji' });


//// [es2021IntlAPIs.js]
const locale = new Intl.Locale('en');
const mixed = ['en', locale];
Intl.DisplayNames(); // expect error
new Intl.DisplayNames(); // expect error
new Intl.DisplayNames('en'); // expect error
new Intl.DisplayNames('en', {}); // expect error
new Intl.DisplayNames('en', { type: 'region' });
new Intl.DisplayNames(locale, { type: 'region' });
new Intl.DisplayNames(mixed, { type: 'region' });
const { style, type } = new Intl.DisplayNames('en', { style: 'long', type: 'language' }).resolvedOptions();
new Intl.DisplayNames('en', { type: 'currency', fallback: 'none' }).of('EUR');
Intl.DisplayNames.supportedLocalesOf(locale, { localeMatcher: 'best fit' });
Intl.ListFormat(); // expect error
new Intl.ListFormat();
new Intl.ListFormat('en');
new Intl.ListFormat(locale);
new Intl.ListFormat(mixed);
const { style: style2, type: type2 } = new Intl.ListFormat('en', { style: 'short', type: 'disjunction' }).resolvedOptions();
new Intl.ListFormat('en').format(['foo', 'bar']);
new Intl.ListFormat('en').formatToParts(new Set().values())[0];
Intl.DisplayNames.supportedLocalesOf(locale, { localeMatcher: 'lookup' });
const { dateStyle, timeStyle, dayPeriod, fractionalSecondDigits } = new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'long', dayPeriod: 'narrow', fractionalSecondDigits: 3 }).resolvedOptions();
new Intl.DateTimeFormat().formatToParts(10)[0].type = 'fractionalSecond';
new Intl.DateTimeFormat().formatRange(new Date(0), new Date());
new Intl.DateTimeFormat().formatRangeToParts(1000, 1000000000)[0].source;
new Intl.Collator('en', { collation: 'emoji' });
