//// [tests/cases/conformance/es2023/intlSupportedValuesOf.ts] ////

//// [intlSupportedValuesOf.ts]
const enumerationKeys = ['calendar', 'collation', 'currency', 'numberingSystem', 'timeZone', 'unit'] as const;
for (const key of enumerationKeys) {
  var supported = Intl.supportedValuesOf(key);
}


//// [intlSupportedValuesOf.js]
const enumerationKeys = ['calendar', 'collation', 'currency', 'numberingSystem', 'timeZone', 'unit'];
for (const key of enumerationKeys) {
    var supported = Intl.supportedValuesOf(key);
}
