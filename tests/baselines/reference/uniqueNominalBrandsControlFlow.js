//// [uniqueNominalBrandsControlFlow.ts]
type BrandA = unique unknown;
type BrandB = unique unknown;

declare function isBrandA(x: any): x is BrandA;
declare function isBrandB(x: any): x is BrandB;

declare function consumeBrandA(x: BrandA): void;
declare function consumeBrandB(x: BrandB): void;
declare function consumeBrandAOrB(x: BrandA | BrandB): void;
declare function consumeBrandAAndB(x: BrandA & BrandB): void;

const x = {x: 12};
if (isBrandA(x)) {
    if (isBrandB(x)) {
        consumeBrandA(x);
        consumeBrandB(x);
        consumeBrandAOrB(x);
        consumeBrandAAndB(x);
    }
    else {
        consumeBrandA(x);
        consumeBrandB(x); // err
        consumeBrandAOrB(x);
        consumeBrandAAndB(x); // err
    }
}
else {
    if (isBrandB(x)) {
        consumeBrandA(x); // err
        consumeBrandB(x);
        consumeBrandAOrB(x);
        consumeBrandAAndB(x); // err
    }
    else {
        consumeBrandA(x); // err
        consumeBrandB(x); // err
        consumeBrandAOrB(x); // err
        consumeBrandAAndB(x); // err
    }
}

type NormalizedPath = unique string;
type AbsolutePath = unique string;
type NormalizedAbsolutePath = NormalizedPath & AbsolutePath;

declare function isNormalizedPath(x: string): x is NormalizedPath;
declare function isAbsolutePath(x: string): x is AbsolutePath;

declare function consumeNormalizedPath(x: NormalizedPath): void;
declare function consumeAbsolutePath(x: AbsolutePath): void;
declare function consumeNormalizedOrAbsolutePath(x: NormalizedPath | AbsolutePath): void;
declare function consumeNormalizedAbsolutePath(x: NormalizedAbsolutePath): void;

const p = "/a/b/c";
if (isNormalizedPath(p)) {
    if (isAbsolutePath(p)) {
        consumeNormalizedPath(p);
        consumeAbsolutePath(p);
        consumeNormalizedOrAbsolutePath(p);
        consumeNormalizedAbsolutePath(p);
    }
    else {
        consumeNormalizedPath(p);
        consumeAbsolutePath(p); // err
        consumeNormalizedOrAbsolutePath(p);
        consumeNormalizedAbsolutePath(p); // err
    }
}
else {
    if (isAbsolutePath(p)) {
        consumeNormalizedPath(p); // err
        consumeAbsolutePath(p);
        consumeNormalizedOrAbsolutePath(p);
        consumeNormalizedAbsolutePath(p); // err
    }
    else {
        consumeNormalizedPath(p); // err
        consumeAbsolutePath(p); // err
        consumeNormalizedOrAbsolutePath(p); // err
        consumeNormalizedAbsolutePath(p); // err
    }
}


//// [uniqueNominalBrandsControlFlow.js]
var x = { x: 12 };
if (isBrandA(x)) {
    if (isBrandB(x)) {
        consumeBrandA(x);
        consumeBrandB(x);
        consumeBrandAOrB(x);
        consumeBrandAAndB(x);
    }
    else {
        consumeBrandA(x);
        consumeBrandB(x); // err
        consumeBrandAOrB(x);
        consumeBrandAAndB(x); // err
    }
}
else {
    if (isBrandB(x)) {
        consumeBrandA(x); // err
        consumeBrandB(x);
        consumeBrandAOrB(x);
        consumeBrandAAndB(x); // err
    }
    else {
        consumeBrandA(x); // err
        consumeBrandB(x); // err
        consumeBrandAOrB(x); // err
        consumeBrandAAndB(x); // err
    }
}
var p = "/a/b/c";
if (isNormalizedPath(p)) {
    if (isAbsolutePath(p)) {
        consumeNormalizedPath(p);
        consumeAbsolutePath(p);
        consumeNormalizedOrAbsolutePath(p);
        consumeNormalizedAbsolutePath(p);
    }
    else {
        consumeNormalizedPath(p);
        consumeAbsolutePath(p); // err
        consumeNormalizedOrAbsolutePath(p);
        consumeNormalizedAbsolutePath(p); // err
    }
}
else {
    if (isAbsolutePath(p)) {
        consumeNormalizedPath(p); // err
        consumeAbsolutePath(p);
        consumeNormalizedOrAbsolutePath(p);
        consumeNormalizedAbsolutePath(p); // err
    }
    else {
        consumeNormalizedPath(p); // err
        consumeAbsolutePath(p); // err
        consumeNormalizedOrAbsolutePath(p); // err
        consumeNormalizedAbsolutePath(p); // err
    }
}
