// @target: es2022

const locale = new Intl.Locale('en');
const mixed = [ 'en', locale ] as const;

Intl.Segmenter(); // expect error
new Intl.Segmenter();
new Intl.Segmenter('en');
new Intl.Segmenter(locale);
new Intl.Segmenter(mixed);
const { granularity } = new Intl.Segmenter('en', { granularity: 'grapheme' }).resolvedOptions();
const segments = new Intl.Segmenter().segment('foo');
segments.containing();
segments.containing(0);
[ ...segments ];
Intl.Segmenter.supportedLocalesOf(locale, { localeMatcher: 'best fit' });

for (const timeZoneName of [ 'shortOffset', 'longOffset', 'shortGeneric', 'longGeneric' ] as const) {
  new Intl.DateTimeFormat('en', { timeZoneName }).resolvedOptions().timeZoneName = timeZoneName;
}

const { languageDisplay } = new Intl.DisplayNames('en', { type: 'region', languageDisplay: 'dialect' }).resolvedOptions();
for (const type of [ 'calendar', 'dateTimeField' ] as const) {
  new Intl.DisplayNames('en', { type }).resolvedOptions().type = type;
}
