// @target: es5, es2015
// @strict: true

new Intl.NumberFormat('en-GB', { useGrouping: true });
new Intl.NumberFormat('en-GB', { useGrouping: 'true' }); // expect error
new Intl.NumberFormat('en-GB', { useGrouping: 'always' }); // expect error

const { useGrouping } = new Intl.NumberFormat('en-GB').resolvedOptions();
