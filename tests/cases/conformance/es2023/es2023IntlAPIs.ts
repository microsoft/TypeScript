// @target: es2022
// @lib: es2022,es2023.intl

const { roundingPriority, roundingMode, roundingIncrement, trailingZeroDisplay, useGrouping } = new Intl.NumberFormat('en', { roundingPriority: 'lessPrecision', roundingIncrement: 100, roundingMode: 'trunc' }).resolvedOptions();
new Intl.NumberFormat('en', { signDisplay: 'negative' }).resolvedOptions().signDisplay = 'negative';
for (const useGrouping of [ 'min2', 'auto', 'always' ] as const) {
	new Intl.NumberFormat('en', { useGrouping }).resolvedOptions().useGrouping = useGrouping;
}
new Intl.NumberFormat().formatRange(10, 1000);
new Intl.NumberFormat().formatRange(10n, 1000n);
new Intl.NumberFormat().formatRangeToParts(10, 1000)[0];
new Intl.NumberFormat().formatRangeToParts(10n, 1000n)[0];

new Intl.NumberFormat().format('-12.3E-4');
new Intl.NumberFormat().formatToParts('123E4')
new Intl.NumberFormat().formatRange('123.4', '567.8');
new Intl.NumberFormat().formatRangeToParts('123E-4', '567E8');
new Intl.NumberFormat().format('Infinity');
new Intl.NumberFormat().format('-Infinity');
new Intl.NumberFormat().format('+Infinity');

for (const key of [ 'calendar', 'collation', 'currency', 'numberingSystem', 'timeZone', 'unit' ] as const) {
  Intl.supportedValuesOf(key);
}
