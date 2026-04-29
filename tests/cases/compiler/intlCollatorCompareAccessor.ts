// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

declare const collator: Intl.Collator;

collator.compare("a", "b");
["a", "b"].sort(collator.compare);

const compare: (this: void, x: string, y: string) => number = collator.compare;
const compareWithThis: Intl.Collator["compare"] = function (this: Intl.Collator, x: string, y: string) {
    return 0;
};

collator.compare = (x: string, y: string) => 0;
