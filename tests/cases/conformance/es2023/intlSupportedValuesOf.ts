// @target: es2022
// @lib: es2022,es2023.intl

const enumerationKeys = ['calendar', 'collation', 'currency', 'numberingSystem', 'timeZone', 'unit'] as const;
for (const key of enumerationKeys) {
  var supported = Intl.supportedValuesOf(key);
}
