// @allowSyntheticDefaultImports: true

interface Match {
  (o: object): 0;
  (o: any): 1;
}
type Wrap = <T>(v: T) => Match(T);
type A = Wrap(RegExp);
