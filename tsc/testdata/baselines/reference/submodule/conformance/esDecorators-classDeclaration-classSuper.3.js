//// [tests/cases/conformance/esDecorators/classDeclaration/classSuper/esDecorators-classDeclaration-classSuper.3.ts] ////

//// [esDecorators-classDeclaration-classSuper.3.ts]
declare var dec: any;

declare class Base {
    static x: number;
}

const x = "x";

@dec
class C extends Base {
    static {
        super.x;
        super.x = 1;
        super.x += 1;
        super.x++;
        super.x--;
        ++super.x;
        --super.x;
        ({ x: super.x } = { x: 1 });
        [super.x] = [1];

        super["x"];
        super["x"] = 1;
        super["x"] += 1;
        super["x"]++;
        super["x"]--;
        ++super["x"];
        --super["x"];
        ({ x: super["x"] } = { x: 1 });
        [super["x"]] = [1];

        super[x];
        super[x] = 1;
        super[x] += 1;
        super[x]++;
        super[x]--;
        ++super[x];
        --super[x];
        ({ x: super[x] } = { x: 1 });
        [super[x]] = [1];
    }
}


//// [esDecorators-classDeclaration-classSuper.3.js]
const x = "x";
@dec
class C extends Base {
    static {
        super.x;
        super.x = 1;
        super.x += 1;
        super.x++;
        super.x--;
        ++super.x;
        --super.x;
        ({ x: super.x } = { x: 1 });
        [super.x] = [1];
        super["x"];
        super["x"] = 1;
        super["x"] += 1;
        super["x"]++;
        super["x"]--;
        ++super["x"];
        --super["x"];
        ({ x: super["x"] } = { x: 1 });
        [super["x"]] = [1];
        super[x];
        super[x] = 1;
        super[x] += 1;
        super[x]++;
        super[x]--;
        ++super[x];
        --super[x];
        ({ x: super[x] } = { x: 1 });
        [super[x]] = [1];
    }
}
