//// [tests/cases/compiler/intlCollatorCompare.ts] ////

//// [intlCollatorCompare.ts]
const collator = new Intl.Collator("en");

const compare = collator.compare;
compare("a", "b");

["b", "a"].sort(collator.compare);
["b", "a"].sort(compare);

collator.compare("a", "b");

// error: compare is readonly
collator.compare = (x: string, y: string) => 0;


//// [intlCollatorCompare.js]
"use strict";
const collator = new Intl.Collator("en");
const compare = collator.compare;
compare("a", "b");
["b", "a"].sort(collator.compare);
["b", "a"].sort(compare);
collator.compare("a", "b");
// error: compare is readonly
collator.compare = (x, y) => 0;
