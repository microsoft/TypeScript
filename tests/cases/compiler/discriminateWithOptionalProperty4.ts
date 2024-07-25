// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55566

export function main(a: string[] | undefined) {
  const z = a ? { a } : { b: ["there"] };

  z.a //
    ? z.a.toString()
    : z.b.toString();

  const zWorkAround:
    | { a: string[]; b?: undefined }
    | { b: string[]; a?: undefined } = z;

  zWorkAround.a ? zWorkAround.a.toString() : zWorkAround.b.toString();

  "a" in z ? z.a.toString() : z.b.toString();
}
