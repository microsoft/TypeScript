//// [tests/cases/compiler/typePredicatesOptionalChaining2.ts] ////

//// [typePredicatesOptionalChaining2.ts]
type Person = { name: string; }

const getName1 = (person?: Person): string => {
  return typeof person?.name === 'string' ? person?.name : '';
};

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const getName2 = (person?: Person): string => {
  return isString(person?.name) ? person?.name : '';
};


//// [typePredicatesOptionalChaining2.js]
const getName1 = (person) => {
    return typeof person?.name === 'string' ? person?.name : '';
};
const isString = (value) => {
    return typeof value === 'string';
};
const getName2 = (person) => {
    return isString(person?.name) ? person?.name : '';
};
