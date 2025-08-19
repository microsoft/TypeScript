// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/1563

function f() {
  const v: unknown = "lol";
  const acceptsRecord = (record: Record<string, string>) => {};
  acceptsRecord(v || {});
}
