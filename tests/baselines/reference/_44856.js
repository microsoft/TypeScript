//// [_44856.ts]
// The expected rule for properties of union type (|) is  
// (1) must contain all required properties of at least one union member
// (2) may contain additional properties that belong to any union member

{
    type A2 = {a: string; b: string};
    type A3 = {a: string; b: boolean; c: number};
  
    {
      // THIS IS THE UNEXPECTED OUTLIER
      const b: A2|A3 = {a: '', b: '', c: 1}; // ❌ assignment strictly checked, extra prop from A3 not allowed
    }
}

{
    type A2 = {a: string; b: string};
    type A3 = {a: string; b: boolean; c: boolean};
    type A4 = {a: string; b: number; c: number};
  
    {
      // THIS IS THE UNEXPECTED OUTLIER
      const b: A2|A3 = {a: '', b: '', c: true}; // ❌ assignment strictly checked, extra prop from A3 not allowed
    }
    {
      // BEHAVING AS EXPECTED
      const b: A2|A3|A4 = {a: '', b: '', c: true}; // ✔ assignments allow extra props of other union types
    }
  }
  
  {
    type A2 = {a: string; b: string};
    type A3 = {a: string; b: boolean; c: boolean};
    type A4 = {a: string; b: boolean; c: number};
  
    {
      // THIS IS THE UNEXPECTED OUTLIER
      const b: A2|A3 = {a: '', b: '', c: true}; // ❌ assignment strictly checked, extra prop from A3 not allowed
    }
    {
      // BEHAVING AS EXPECTED
      const b: A2|A3|A4 = {a: '', b: '', c: true}; // ✔ assignments allow extra props of other union types
    }
  }


//// [_44856.js]
// The expected rule for properties of union type (|) is  
// (1) must contain all required properties of at least one union member
// (2) may contain additional properties that belong to any union member
{
    {
        // THIS IS THE UNEXPECTED OUTLIER
        var b = { a: '', b: '', c: 1 }; // ❌ assignment strictly checked, extra prop from A3 not allowed
    }
}
{
    {
        // THIS IS THE UNEXPECTED OUTLIER
        var b = { a: '', b: '', c: true }; // ❌ assignment strictly checked, extra prop from A3 not allowed
    }
    {
        // BEHAVING AS EXPECTED
        var b = { a: '', b: '', c: true }; // ✔ assignments allow extra props of other union types
    }
}
{
    {
        // THIS IS THE UNEXPECTED OUTLIER
        var b = { a: '', b: '', c: true }; // ❌ assignment strictly checked, extra prop from A3 not allowed
    }
    {
        // BEHAVING AS EXPECTED
        var b = { a: '', b: '', c: true }; // ✔ assignments allow extra props of other union types
    }
}
