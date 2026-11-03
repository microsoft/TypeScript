// @target: es2015, es2020, es2021
// @strict: true
// @noTypesAndSymbols: true

declare function getObject(): { x: number; [key: number]: number };
let key = 0;

function logicalOrAssignment() {
    getObject()[++key]! ||= 1;
    (getObject()[++key] as number) ||= 1;
    (getObject()[++key] satisfies number) ||= 1;
    (<number>getObject()[++key]) ||= 1;
    ((getObject()[++key]) as number)! ||= 1;
    (getObject()[++key]) ||= 1;

    getObject().x! ||= 1;
    (getObject().x as number) ||= 1;
    (getObject().x satisfies number) ||= 1;
    (<number>getObject().x) ||= 1;
    ((getObject().x) as number)! ||= 1;
    (getObject().x) ||= 1;
}

function logicalAndAssignment() {
    getObject()[++key]! &&= 1;
    (getObject()[++key] as number) &&= 1;
    (getObject()[++key] satisfies number) &&= 1;
    (<number>getObject()[++key]) &&= 1;
    ((getObject()[++key]) as number)! &&= 1;
    (getObject()[++key]) &&= 1;

    getObject().x! &&= 1;
    (getObject().x as number) &&= 1;
    (getObject().x satisfies number) &&= 1;
    (<number>getObject().x) &&= 1;
    ((getObject().x) as number)! &&= 1;
    (getObject().x) &&= 1;
}

function nullishAssignment() {
    getObject()[++key]! ??= 1;
    (getObject()[++key] as number) ??= 1;
    (getObject()[++key] satisfies number) ??= 1;
    (<number>getObject()[++key]) ??= 1;
    ((getObject()[++key]) as number)! ??= 1;
    (getObject()[++key]) ??= 1;

    getObject().x! ??= 1;
    (getObject().x as number) ??= 1;
    (getObject().x satisfies number) ??= 1;
    (<number>getObject().x) ??= 1;
    ((getObject().x) as number)! ??= 1;
    (getObject().x) ??= 1;
}

function exponentiationAssignment() {
    getObject()[++key]! **= 2;
    (getObject()[++key] as number) **= 2;
    (getObject()[++key] satisfies number) **= 2;
    (<number>getObject()[++key]) **= 2;
    ((getObject()[++key]) as number)! **= 2;
    (getObject()[++key]) **= 2;

    getObject().x! **= 2;
    (getObject().x as number) **= 2;
    (getObject().x satisfies number) **= 2;
    (<number>getObject().x) **= 2;
    ((getObject().x) as number)! **= 2;
    (getObject().x) **= 2;
}

declare function getKey(): "x";

class Base {
    get x() { return 2; }
    set x(value: number) {}
}

class Derived extends Base {
    logicalAssignment() {
        super.x! ||= 1;
        (super.x as number) &&= 1;
        (super.x satisfies number) ??= 1;
        (<number>super[getKey()]) ||= 1;
        super[getKey()]! &&= 1;
        (super[getKey()] as number) ??= 1;
    }

    exponentiationAssignment() {
        super.x! **= 2;
        (super.x as number) **= 2;
        (super.x satisfies number) **= 2;
        (<number>super.x) **= 2;
        ((super.x) as number)! **= 2;
        (super.x) **= 2;

        super[getKey()]! **= 2;
        (super[getKey()] as number) **= 2;
        (super[getKey()] satisfies number) **= 2;
        (<number>super[getKey()]) **= 2;
        ((super[getKey()]) as number)! **= 2;
        (super[getKey()]) **= 2;
    }
}
