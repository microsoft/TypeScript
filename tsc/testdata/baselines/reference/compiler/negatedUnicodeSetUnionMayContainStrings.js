//// [tests/cases/compiler/negatedUnicodeSetUnionMayContainStrings.ts] ////

//// [negatedUnicodeSetUnionMayContainStrings.ts]
const a = /[^\q{xy}b]/v;
const b = /[^b\q{xy}]/v;
const c = /[^[b\q{xy}c]]/v;


//// [negatedUnicodeSetUnionMayContainStrings.js]
"use strict";
const a = /[^\q{xy}b]/v;
const b = /[^b\q{xy}]/v;
const c = /[^[b\q{xy}c]]/v;
