//// [tests/cases/conformance/es2016/es2016IntlAPIs.ts] ////

//// [es2016IntlAPIs.ts]
Intl.getCanonicalLocales('EN-US');
Intl.getCanonicalLocales([ 'EN-US', 'Fr' ]);
Intl.getCanonicalLocales([ 'EN-US' ] as const);


//// [es2016IntlAPIs.js]
Intl.getCanonicalLocales('EN-US');
Intl.getCanonicalLocales(['EN-US', 'Fr']);
Intl.getCanonicalLocales(['EN-US']);
