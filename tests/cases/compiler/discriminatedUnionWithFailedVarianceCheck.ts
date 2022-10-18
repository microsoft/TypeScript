// @strict: true
// @noEmit: true

interface StringType { prop: string }
interface UnknownType { prop: unknown }
interface ResultOne<G extends UnknownType> {
  type: "one";
  value: G["prop"];
}
interface ResultTwo<G extends UnknownType> {
  type: "two";
  other: G["prop"];
}

// repro #51180

function callback<G extends UnknownType>(): ResultOne<G> | ResultTwo<G> {
  const dt: ResultOne<StringType> = {
    type: "one",
    value: "abc",
  };

  return dt; // error
}

// repro #51180#issuecomment-1279445430

function callback2<G extends UnknownType>(s: ResultOne<StringType>) {
    const a1: ResultOne<G> = s; // error
    const a2: ResultTwo<G> = s; // error
    const m: ResultOne<G> | ResultTwo<G> = s; // error
}