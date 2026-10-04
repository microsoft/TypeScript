// @strict: true

// Repro from GH#62264
// Class property should infer the wider declared type (AB), not the narrowed literal type ("A")

type AB = 'A' | 'B';

const DEFAULT: AB = 'A';

class C {
    D = DEFAULT;

    method() {
        switch (this.D) {
            case 'A': break;
            case 'B': break; // should not error
        }
    }
}

// D should be AB, not "A"
declare const c: C;
declare function expectAB(x: AB): void;
expectAB(c.D); // ok
c.D = 'B'; // ok

// Static property should work the same way
class D {
    static SD = DEFAULT;
}
D.SD = 'B'; // ok
