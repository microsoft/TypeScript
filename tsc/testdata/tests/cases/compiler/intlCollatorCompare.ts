// @strict: true
// @target: es2015

const collator = new Intl.Collator("en");

const compare = collator.compare;
compare("a", "b");

["b", "a"].sort(collator.compare);
["b", "a"].sort(compare);

collator.compare("a", "b");

// error: compare is readonly
collator.compare = (x: string, y: string) => 0;
