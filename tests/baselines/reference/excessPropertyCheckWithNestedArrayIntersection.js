//// [excessPropertyCheckWithNestedArrayIntersection.ts]
interface ValueOnlyFields {
    fields: Array<{
        value: number | null;
    }>;
}
interface ValueAndKeyFields {
    fields: Array<{
        key: string | null;
        value: number | null;
    }>;
}
interface BugRepro {
  dataType: ValueAndKeyFields & ValueOnlyFields;
}
const repro: BugRepro = {
  dataType: {
    fields: [{
      key: 'bla', // should be OK: Not excess
      value: null,
    }],
  }
}


//// [excessPropertyCheckWithNestedArrayIntersection.js]
var repro = {
    dataType: {
        fields: [{
                key: 'bla',
                value: null
            }]
    }
};
