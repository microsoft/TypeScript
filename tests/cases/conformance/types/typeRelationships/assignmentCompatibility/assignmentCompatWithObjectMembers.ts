// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M
// no errors expected

namespace SimpleTypes {
    class S { foo: string; }
    class T { foo: string; }
    var s: S;
    var t: T;

    interface S2 { foo: string; }
    interface T2 { foo: string; }
    var s2: S2;
    var t2: T2;

    var a: { foo: string; }
    var b: { foo: string; }

    var a2 = { foo: '' };
    var b2 = { foo: '' };

    s = t;
    t = s;
    s = s2;
    s = a2;

    s2 = t2;
    t2 = s2;
    s2 = t;
    s2 = b;
    s2 = a2;

    a = b;
    b = a;
    a = s;
    a = s2;
    a = a2;

    a2 = b2;
    b2 = a2;
    a2 = b;
    a2 = t2;
    a2 = t;
}

namespace ObjectTypes {
    class S { foo: S; }
    class T { foo: T; }
    var s: S;
    var t: T;

    interface S2 { foo: S2; }
    interface T2 { foo: T2; }
    var s2: S2;
    var t2: T2;

    var a: { foo: typeof a; }
    var b: { foo: typeof b; }

    var a2 = { foo: a2 };
    var b2 = { foo: b2 };

    s = t;
    t = s;
    s = s2;
    s = a2;

    s2 = t2;
    t2 = s2;
    s2 = t;
    s2 = b;
    s2 = a2;

    a = b;
    b = a;
    a = s;
    a = s2;
    a = a2;

    a2 = b2;
    b2 = a2;
    a2 = b;
    a2 = t2;
    a2 = t;

}