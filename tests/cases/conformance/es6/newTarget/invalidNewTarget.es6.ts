// @target: es6
const a = new.target;
const b = () => new.target;

class C {
    [new.target]() { }
    c() { return new.target; }
    get d() { return new.target; }
    set e(_) { _ = new.target; }
    f = () => new.target;

    static [new.target]() { }
    static g() { return new.target; }
    static get h() { return new.target; }
    static set i(_) { _ = new.target; }
    static j = () => new.target;
}

const O = {
    [new.target]: undefined,
    k() { return new.target; },
    get l() { return new.target; },
    set m(_) { _ = new.target; },
    n: new.target,
};