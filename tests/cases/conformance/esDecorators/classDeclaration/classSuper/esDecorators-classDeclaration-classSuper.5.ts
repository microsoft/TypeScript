// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare var dec: any;

declare class Base {
    static x: number;
}

const x = "x";

@dec
class C1 extends Base {
    static a = super.x;
    static b = super.x = 1;
    static c = super.x += 1;
    static d = super.x++;
    static e = super.x--;
    static f = ++super.x;
    static g = --super.x;
    static h = ({ x: super.x } = { x: 1 });
    static i = [super.x] = [1];
}

@dec
class C2 extends Base {
    static a = super["x"];
    static b = super["x"] = 1;
    static c = super["x"] += 1;
    static d = super["x"]++;
    static e = super["x"]--;
    static f = ++super["x"];
    static g = --super["x"];
    static h = ({ x: super["x"] } = { x: 1 });
    static i = [super["x"]] = [1];
}

@dec
class C3 extends Base {
    static a = super[x];
    static b = super[x] = 1;
    static c = super[x] += 1;
    static d = super[x]++;
    static e = super[x]--;
    static f = ++super[x];
    static g = --super[x];
    static h = ({ x: super[x] } = { x: 1 });
    static i = [super[x]] = [1];
}
