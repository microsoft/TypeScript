// @strict: true
// @declaration: true

interface Foodb {
    getValues(): number[];
}

declare const foodb: Foodb | undefined;

const valsb = foodb?.getValues();
if (valsb) {
    foodb; // before: Foodb|undefined after: Foodb 
    foodb.getValues; // before: error, after: OK
    foodb.getValues(); // before: error, after: OK
}
