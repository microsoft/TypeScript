// @strict: true
// @noEmit: true

interface Data {
  a?: number;
}

declare const data: Data;

let key = "a" as const;

if (data.a !== undefined) {
  const a = data[key];
}
