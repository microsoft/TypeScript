//// [privateNamesAndkeyof.ts]
class A {
    #fooField = 3;
    #fooMethod() { };
    get #fooProp() { return 1; };
    set #fooProp(value: number) { };
    bar = 3;
    baz = 3;
}

type T = keyof A     // should not include '#foo*'


tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js(9,5): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js(9,8): error TS1005: '=>' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js(11,12): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js(13,17): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js(15,1): error TS1128: Declaration or statement expected.


==== tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js (5 errors) ====
    "use strict";
    var _fooField, _fooMethod, _fooProp, _fooProp_1;
    class A {
        constructor() {
            _fooField.set(this, 3);
            this.bar = 3;
            this.baz = 3;
        }
        () { }
        ~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
           ~
!!! error TS1005: '=>' expected.
        ;
        get () { return 1; }
               ~
!!! error TS1005: ';' expected.
        ;
        set (value) { }
                    ~
!!! error TS1005: ';' expected.
        ;
    }
    ~
!!! error TS1128: Declaration or statement expected.
    _fooField = new WeakMap(), _fooMethod = new WeakMap(), _fooProp = new WeakMap(), _fooProp_1 = new WeakMap();
    