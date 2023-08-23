const a = 'a';
const b = 'b';
const d = 'd';

type A = { [a]: number; };
type B = { [b]: string; };

declare const c: A | B;

if ('a' in c) {
    c;      // A
    c['a']; // number;
}

if ('d' in c) {
    c; // never
}

if (a in c) {
    c;    // A
    c[a]; // number;
}

if (d in c) {
    c; // never
}

// repro from https://github.com/microsoft/TypeScript/issues/54790

function uniqueID_54790(
  id: string | undefined,
  seenIDs: { [key: string]: string }
): string {
  if (id === undefined) {
    id = "1";
  }
  if (!(id in seenIDs)) {
    return id;
  }
  for (let i = 1; i < Number.MAX_VALUE; i++) {
    const newID = `${id}-${i}`;
    if (!(newID in seenIDs)) {
      return newID;
    }
  }
  throw Error("heat death of the universe");
}

function uniqueID_54790_2(id: string | number, seenIDs: object) {
  id = "a";
  for (let i = 1; i < 3; i++) {
    const newID = `${id}`;
    if (newID in seenIDs) {
    }
  }
}

function uniqueID_54790_3(id: string | number, seenIDs: object) {
  id = "a";
  for (let i = 1; i < 3; i++) {
    const newID = id;
    if (newID in seenIDs) {
    }
  }
}
