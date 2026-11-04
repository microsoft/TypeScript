// @target: esnext
// @erasableSyntaxOnly: false, true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: invalid.ts
export {};
declare let x: any;
declare const obj: { p?: number };

// Assertions must not hide an invalid left operand of **.
-x ** 2;
-x as any ** 2;
+x as any ** 2;
~x as any ** 2;
!x as any ** 2;
typeof x as any ** 2;
void x as any ** 2;
delete obj.p as any ** 2;

-x satisfies any ** 2;
+x satisfies any ** 2;
~x satisfies any ** 2;
!x satisfies any ** 2;
typeof x satisfies any ** 2;
void x satisfies any ** 2;
delete obj.p satisfies any ** 2;

-x as any as number ** 2;
-x satisfies any satisfies number ** 2;
-x as any satisfies number ** 2;
-x satisfies any as number ** 2;
-(x) as number ** 2;
-x! satisfies number ** 2;
<number>x as number ** 2;
<number>-x satisfies number ** 2;
2 ** -x as number ** 2;

async function invalidAwait() {
    await x ** 2;
    await x as number ** 2;
    await x satisfies number ** 2;
    await x as any as number ** 2;
    await x satisfies any satisfies number ** 2;
    await x as any satisfies number ** 2;
    await x satisfies any as number ** 2;
}

// @filename: valid.ts
export {};
declare let x: any;
declare const obj: { p?: number };

// Parentheses, update expressions, and unary right operands remain valid.
(-x) as number ** 2;
(-x) satisfies number ** 2;
(-x as number) ** 2;
(-x satisfies number) ** 2;
(-x) as any satisfies number ** 2;
(+x) as number ** 2;
(~x) satisfies number ** 2;
(!x) as any ** 2;
(typeof x) as any ** 2;
(void x) as any ** 2;
(delete obj.p) as any ** 2;
x as number ** 2;
x! satisfies number ** 2;
++x as number ** 2;
--x satisfies number ** 2;
x++ satisfies number ** 2;
x-- as number ** 2;
-x as number * 2;
2 ** -x as number;
2 ** (-x as number);
2 ** (-x satisfies number);

async function validAwait() {
    (await x) as number ** 2;
    (await x) satisfies number ** 2;
    (await x as number) ** 2;
    (await x satisfies number) ** 2;
    (await x) satisfies any as number ** 2;
    2 ** await x as number;
}
