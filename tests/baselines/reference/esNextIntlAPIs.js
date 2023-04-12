//// [esNextIntlAPIs.ts]
const enumerationKeys = ['calendar', 'collation', 'currency', 'numberingSystem', 'timeZone', 'unit'] as const;
for (const key of enumerationKeys) {
  var supported = Intl.supportedValuesOf(key);
}


//// [esNextIntlAPIs.js]
const enumerationKeys = ['calendar', 'collation', 'currency', 'numberingSystem', 'timeZone', 'unit'];
for (const key of enumerationKeys) {
    var supported = Intl.supportedValuesOf(key);
}
