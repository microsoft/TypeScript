//// [tests/cases/conformance/es2020/intlNumberFormatES2020.ts] ////

//// [intlNumberFormatES2020.ts]
// New/updated resolved options in ES2020
const { notation, style, signDisplay } = new Intl.NumberFormat('en-NZ').resolvedOptions();

// Empty options
new Intl.NumberFormat('en-NZ', {});

// Override numbering system
new Intl.NumberFormat('en-NZ', { numberingSystem: 'arab' });

// Currency
const { currency, currencySign } = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();

// Units
const { unit, unitDisplay } = new Intl.NumberFormat('en-NZ', { style: 'unit', unit: 'kilogram', unitDisplay: 'narrow' }).resolvedOptions();

// Compact
const { compactDisplay } = new Intl.NumberFormat('en-NZ', { notation: 'compact', compactDisplay: 'long' }).resolvedOptions();

// Sign display
new Intl.NumberFormat('en-NZ', { signDisplay: 'always' });

// New additions to NumberFormatPartTypes
const types: Intl.NumberFormatPartTypes[] = [ 'compact', 'unit', 'unknown' ];


//// [intlNumberFormatES2020.js]
"use strict";
// New/updated resolved options in ES2020
const { notation, style, signDisplay } = new Intl.NumberFormat('en-NZ').resolvedOptions();
// Empty options
new Intl.NumberFormat('en-NZ', {});
// Override numbering system
new Intl.NumberFormat('en-NZ', { numberingSystem: 'arab' });
// Currency
const { currency, currencySign } = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD', currencySign: 'accounting' }).resolvedOptions();
// Units
const { unit, unitDisplay } = new Intl.NumberFormat('en-NZ', { style: 'unit', unit: 'kilogram', unitDisplay: 'narrow' }).resolvedOptions();
// Compact
const { compactDisplay } = new Intl.NumberFormat('en-NZ', { notation: 'compact', compactDisplay: 'long' }).resolvedOptions();
// Sign display
new Intl.NumberFormat('en-NZ', { signDisplay: 'always' });
// New additions to NumberFormatPartTypes
const types = ['compact', 'unit', 'unknown'];
