// @noEmit: true
// @strict: true

// repro 49988#issuecomment-1192016929

declare function isObject1(value: unknown): value is Record<string, unknown>;

declare const obj1: {};
if (isObject1(obj1)) {
    obj1;
    obj1['attr'];
}
// check type after conditional block
obj1;

declare const obj2: {} | undefined;
if (isObject1(obj2)) {
    obj2;
    obj2['attr'];
}
// check type after conditional block
obj2;

declare function isObject2(value: unknown): value is {};

declare const obj3: Record<string, unknown>;
if (isObject2(obj3)) {
    obj3;
    obj3['attr'];
}
// check type after conditional block
obj3;

declare const obj4: Record<string, unknown> | undefined;
if (isObject2(obj4)) {
    obj4;
    obj4['attr'];
}
// check type after conditional block
obj4;
