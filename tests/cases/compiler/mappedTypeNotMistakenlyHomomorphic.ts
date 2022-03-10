enum ABC { A, B }

type Gen<T extends ABC> = { v: T; } & (
  {
    v: ABC.A,
    a: string,
  } | {
    v: ABC.B,
    b: string,
  }
)

// Quick info: ???
//
// type Gen2<T extends ABC> = {
//    v: string;
// }
//
type Gen2<T extends ABC> = {
  [Property in keyof Gen<T>]: string;
};

// 'a' and 'b' properties required !?!?
const gen2TypeA: Gen2<ABC.A> = { v:  "I am A", a: "" };
const gen2TypeB: Gen2<ABC.B> = { v:  "I am B", b: "" };

// 'v' ???
type K = keyof Gen2<ABC.A>;

// :(
declare let a: Gen2<ABC.A>;
declare let b: Gen2<ABC.B>;
a = b;
b = a;
