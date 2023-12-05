//// [tests/cases/compiler/divergentAccessorsVisibility1.ts] ////

//// [divergentAccessorsVisibility1.ts]
class Base {
    get PublicPublic() { return 0; }
    set PublicPublic(v) { return; }

    get PublicProtected() { return 0; }
    protected set PublicProtected(v) { return; }

    get PublicPrivate() { return 0; }
    private set PublicPrivate(v) { return; }

    protected get ProtectedPublic() { return 0; }
    set ProtectedPublic(v) { return; }

    protected get ProtectedProtected() { return 0; }
    protected set ProtectedProtected(v) { return; }

    protected get ProtectedPrivate() { return 0; }
    private set ProtectedPrivate(v) { return; }

    private get PrivatePublic() { return 0; }
    set PrivatePublic(v) { return; }

    private get PrivateProtected() { return 0; }
    protected set PrivateProtected(v) { return; }

    private get PrivatePrivate() { return 0; }
    private set PrivatePrivate(v) { return; }

    test() {
        this.PublicPublic = 0;
        this.PublicProtected = 0;
        this.PublicPrivate = 0;
        this.ProtectedPublic = 0;
        this.ProtectedProtected = 0;
        this.ProtectedPrivate = 0;
        this.PrivatePublic = 0;
        this.PrivateProtected = 0;
        this.PrivatePrivate = 0;

        void this.PublicPublic;
        void this.PublicProtected;
        void this.PublicPrivate;
        void this.ProtectedPublic;
        void this.ProtectedProtected;
        void this.ProtectedPrivate;
        void this.PrivatePublic;
        void this.PrivateProtected;
        void this.PrivatePrivate;

        this.PublicPublic += 0;
        this.PublicProtected += 0;
        this.PublicPrivate += 0;
        this.ProtectedPublic += 0;
        this.ProtectedProtected += 0;
        this.ProtectedPrivate += 0;
        this.PrivatePublic += 0;
        this.PrivateProtected += 0;
        this.PrivatePrivate += 0;
    }
}

class Derived extends Base {
    test2() {
        this.PublicPublic = 0;
        this.PublicProtected = 0;
        this.PublicPrivate = 0;
        this.ProtectedPublic = 0;
        this.ProtectedProtected = 0;
        this.ProtectedPrivate = 0;
        this.PrivatePublic = 0;
        this.PrivateProtected = 0;
        this.PrivatePrivate = 0;

        void this.PublicPublic;
        void this.PublicProtected;
        void this.PublicPrivate;
        void this.ProtectedPublic;
        void this.ProtectedProtected;
        void this.ProtectedPrivate;
        void this.PrivatePublic;
        void this.PrivateProtected;
        void this.PrivatePrivate;

        this.PublicPublic += 0;
        this.PublicProtected += 0;
        this.PublicPrivate += 0;
        this.ProtectedPublic += 0;
        this.ProtectedProtected += 0;
        this.ProtectedPrivate += 0;
        this.PrivatePublic += 0;
        this.PrivateProtected += 0;
        this.PrivatePrivate += 0;
    }
}

declare const base: Base, deriv: Derived;
function fn() {
    base.PublicPublic = 0;
    base.PublicProtected = 0;
    base.PublicPrivate = 0;
    base.ProtectedPublic = 0;
    base.ProtectedProtected = 0;
    base.ProtectedPrivate = 0;
    base.PrivatePublic = 0;
    base.PrivateProtected = 0;
    base.PrivatePrivate = 0;

    void base.PublicPublic;
    void base.PublicProtected;
    void base.PublicPrivate;
    void base.ProtectedPublic;
    void base.ProtectedProtected;
    void base.ProtectedPrivate;
    void base.PrivatePublic;
    void base.PrivateProtected;
    void base.PrivatePrivate;

    base.PublicPublic += 0;
    base.PublicProtected += 0;
    base.PublicPrivate += 0;
    base.ProtectedPublic += 0;
    base.ProtectedProtected += 0;
    base.ProtectedPrivate += 0;
    base.PrivatePublic += 0;
    base.PrivateProtected += 0;
    base.PrivatePrivate += 0;

    deriv.PublicPublic = 0;
    deriv.PublicProtected = 0;
    deriv.PublicPrivate = 0;
    deriv.ProtectedPublic = 0;
    deriv.ProtectedProtected = 0;
    deriv.ProtectedPrivate = 0;
    deriv.PrivatePublic = 0;
    deriv.PrivateProtected = 0;
    deriv.PrivatePrivate = 0;

    void deriv.PublicPublic;
    void deriv.PublicProtected;
    void deriv.PublicPrivate;
    void deriv.ProtectedPublic;
    void deriv.ProtectedProtected;
    void deriv.ProtectedPrivate;
    void deriv.PrivatePublic;
    void deriv.PrivateProtected;
    void deriv.PrivatePrivate;

    deriv.PublicPublic += 0;
    deriv.PublicProtected += 0;
    deriv.PublicPrivate += 0;
    deriv.ProtectedPublic += 0;
    deriv.ProtectedProtected += 0;
    deriv.ProtectedPrivate += 0;
    deriv.PrivatePublic += 0;
    deriv.PrivateProtected += 0;
    deriv.PrivatePrivate += 0;
}


//// [divergentAccessorsVisibility1.js]
"use strict";
class Base {
    get PublicPublic() { return 0; }
    set PublicPublic(v) { return; }
    get PublicProtected() { return 0; }
    set PublicProtected(v) { return; }
    get PublicPrivate() { return 0; }
    set PublicPrivate(v) { return; }
    get ProtectedPublic() { return 0; }
    set ProtectedPublic(v) { return; }
    get ProtectedProtected() { return 0; }
    set ProtectedProtected(v) { return; }
    get ProtectedPrivate() { return 0; }
    set ProtectedPrivate(v) { return; }
    get PrivatePublic() { return 0; }
    set PrivatePublic(v) { return; }
    get PrivateProtected() { return 0; }
    set PrivateProtected(v) { return; }
    get PrivatePrivate() { return 0; }
    set PrivatePrivate(v) { return; }
    test() {
        this.PublicPublic = 0;
        this.PublicProtected = 0;
        this.PublicPrivate = 0;
        this.ProtectedPublic = 0;
        this.ProtectedProtected = 0;
        this.ProtectedPrivate = 0;
        this.PrivatePublic = 0;
        this.PrivateProtected = 0;
        this.PrivatePrivate = 0;
        void this.PublicPublic;
        void this.PublicProtected;
        void this.PublicPrivate;
        void this.ProtectedPublic;
        void this.ProtectedProtected;
        void this.ProtectedPrivate;
        void this.PrivatePublic;
        void this.PrivateProtected;
        void this.PrivatePrivate;
        this.PublicPublic += 0;
        this.PublicProtected += 0;
        this.PublicPrivate += 0;
        this.ProtectedPublic += 0;
        this.ProtectedProtected += 0;
        this.ProtectedPrivate += 0;
        this.PrivatePublic += 0;
        this.PrivateProtected += 0;
        this.PrivatePrivate += 0;
    }
}
class Derived extends Base {
    test2() {
        this.PublicPublic = 0;
        this.PublicProtected = 0;
        this.PublicPrivate = 0;
        this.ProtectedPublic = 0;
        this.ProtectedProtected = 0;
        this.ProtectedPrivate = 0;
        this.PrivatePublic = 0;
        this.PrivateProtected = 0;
        this.PrivatePrivate = 0;
        void this.PublicPublic;
        void this.PublicProtected;
        void this.PublicPrivate;
        void this.ProtectedPublic;
        void this.ProtectedProtected;
        void this.ProtectedPrivate;
        void this.PrivatePublic;
        void this.PrivateProtected;
        void this.PrivatePrivate;
        this.PublicPublic += 0;
        this.PublicProtected += 0;
        this.PublicPrivate += 0;
        this.ProtectedPublic += 0;
        this.ProtectedProtected += 0;
        this.ProtectedPrivate += 0;
        this.PrivatePublic += 0;
        this.PrivateProtected += 0;
        this.PrivatePrivate += 0;
    }
}
function fn() {
    base.PublicPublic = 0;
    base.PublicProtected = 0;
    base.PublicPrivate = 0;
    base.ProtectedPublic = 0;
    base.ProtectedProtected = 0;
    base.ProtectedPrivate = 0;
    base.PrivatePublic = 0;
    base.PrivateProtected = 0;
    base.PrivatePrivate = 0;
    void base.PublicPublic;
    void base.PublicProtected;
    void base.PublicPrivate;
    void base.ProtectedPublic;
    void base.ProtectedProtected;
    void base.ProtectedPrivate;
    void base.PrivatePublic;
    void base.PrivateProtected;
    void base.PrivatePrivate;
    base.PublicPublic += 0;
    base.PublicProtected += 0;
    base.PublicPrivate += 0;
    base.ProtectedPublic += 0;
    base.ProtectedProtected += 0;
    base.ProtectedPrivate += 0;
    base.PrivatePublic += 0;
    base.PrivateProtected += 0;
    base.PrivatePrivate += 0;
    deriv.PublicPublic = 0;
    deriv.PublicProtected = 0;
    deriv.PublicPrivate = 0;
    deriv.ProtectedPublic = 0;
    deriv.ProtectedProtected = 0;
    deriv.ProtectedPrivate = 0;
    deriv.PrivatePublic = 0;
    deriv.PrivateProtected = 0;
    deriv.PrivatePrivate = 0;
    void deriv.PublicPublic;
    void deriv.PublicProtected;
    void deriv.PublicPrivate;
    void deriv.ProtectedPublic;
    void deriv.ProtectedProtected;
    void deriv.ProtectedPrivate;
    void deriv.PrivatePublic;
    void deriv.PrivateProtected;
    void deriv.PrivatePrivate;
    deriv.PublicPublic += 0;
    deriv.PublicProtected += 0;
    deriv.PublicPrivate += 0;
    deriv.ProtectedPublic += 0;
    deriv.ProtectedProtected += 0;
    deriv.ProtectedPrivate += 0;
    deriv.PrivatePublic += 0;
    deriv.PrivateProtected += 0;
    deriv.PrivatePrivate += 0;
}
