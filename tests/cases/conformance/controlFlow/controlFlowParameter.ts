// @strictNullChecks: true
// @allowUnreachableCode: false
function f1(
  required: unknown = (() => {
    throw new Error("bad");
  })()
) {
  console.log("ok"); // should not trigger 'Unreachable code detected.'
}

function f2(
  a: number | string | undefined,
  required: unknown = (() => {
    a = 1;
  })()
) {
  a; // should be number | string | undefined
}

function f3(
  a: number | string | undefined = 1,
  required: unknown = (() => {
    a = "";
  })()
) {
  a; // should be number | string
}

function f4(
  a: number | string | undefined = 1,
  { [(a = "")]: b } = {} as any
) {
  a; // should be string
}
