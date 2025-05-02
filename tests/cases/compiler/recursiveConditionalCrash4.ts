// @strict: true
// @noEmit: true

// Repros from #53783

type LengthDown<
  Str extends string,
  Length extends number | bigint,
  It
> = It extends StrIter.Iterator
  ? StrIter.CutAt<Str, It> extends `${infer $Rest}`
    ? LengthDown<$Rest, Add<Length, StrIter.Value<It>>, It>
    : LengthDown<Str, Length, StrIter.Prev<It>>
  : Length;

type Foo<T> = T extends unknown
  ? unknown extends `${infer $Rest}`
    ? Foo<T>
    : Foo<unknown>
  : unknown;
