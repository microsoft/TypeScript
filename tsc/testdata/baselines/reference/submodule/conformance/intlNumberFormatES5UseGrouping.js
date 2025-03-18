//// [tests/cases/conformance/es2023/intlNumberFormatES5UseGrouping.ts] ////

//// [intlNumberFormatES5UseGrouping.ts]
new Intl.NumberFormat('en-GB', { useGrouping: true });
new Intl.NumberFormat('en-GB', { useGrouping: 'true' }); // expect error
new Intl.NumberFormat('en-GB', { useGrouping: 'always' }); // expect error

const { useGrouping } = new Intl.NumberFormat('en-GB').resolvedOptions();


//// [intlNumberFormatES5UseGrouping.js]
new Intl.NumberFormat('en-GB', { useGrouping: true });
new Intl.NumberFormat('en-GB', { useGrouping: 'true' });
new Intl.NumberFormat('en-GB', { useGrouping: 'always' });
const { useGrouping } = new Intl.NumberFormat('en-GB').resolvedOptions();
