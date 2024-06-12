// @target: es2016

Intl.getCanonicalLocales('EN-US');
Intl.getCanonicalLocales([ 'EN-US', 'Fr' ]);
Intl.getCanonicalLocales([ 'EN-US' ] as const);
