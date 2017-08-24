//// [overloadSelection.ts]
interface Match {
  (o: object): 0;
  (o: any): 1;
}
type Wrap = <T = RegExp>(v: T) => Match(T);
type A = Wrap(RegExp);
// falls thru to 1, `object` checked not with generic val `RegExp` but with its constraint (generic `any`)


//// [overloadSelection.js]
// falls thru to 1, `object` checked not with generic val `RegExp` but with its constraint (generic `any`)
