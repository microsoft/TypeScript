// @target: es2022

const enUS = new Intl.Locale("en-US");
const deDE = new Intl.Locale("de-DE");
const jaJP = new Intl.Locale("ja-JP");

new Intl.Segmenter(enUS);
new Intl.Segmenter([deDE, jaJP]);
Intl.Segmenter.supportedLocalesOf(enUS);
Intl.Segmenter.supportedLocalesOf([deDE, jaJP]);
