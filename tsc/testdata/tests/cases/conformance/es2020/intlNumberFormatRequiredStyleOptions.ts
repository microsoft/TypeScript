// @target: es2020
// @strict: true

// Currency style requires a currency to be specified.
new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' });
new Intl.NumberFormat('en-NZ', { style: 'currency' });
new Intl.NumberFormat('en-NZ', { style: 'currency', currency: undefined });

// Unit style requires a unit to be specified.
new Intl.NumberFormat('en-NZ', { style: 'unit', unit: 'kilogram' });
new Intl.NumberFormat('en-NZ', { style: 'unit' });
new Intl.NumberFormat('en-NZ', { style: 'unit', unit: undefined });

// Other styles do not require currency/unit.
new Intl.NumberFormat('en-NZ', { style: 'decimal' });
new Intl.NumberFormat('en-NZ', { style: 'percent' });
new Intl.NumberFormat('en-NZ');
new Intl.NumberFormat('en-NZ', {});

// Widened option bags are not checked for the required relationship.
declare const currencyOptions: Intl.NumberFormatOptions;
new Intl.NumberFormat('en-NZ', currencyOptions);
