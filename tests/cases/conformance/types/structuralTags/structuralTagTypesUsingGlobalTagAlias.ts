export type Paired = {
    x: number & Tag<"x">;
    y: number & Tag<"y">;
};


export function isPaired(x: {x: number, y: number}): x is Paired {
    return true;
}

export function makePair(x: number, y: number): Paired {
    return {x, y} as Paired;
}

const a = makePair(0, 0);
const b = {x: 0, y: 0};

if (Math.random() > 0.3) {
    b.x = a.x;
    b.y = a.y;
}

if (isPaired(b)) {
    b.x = a.x;
    b.y = a.y;
    a.x = b.x;
    a.y = b.y;
}


type NormalizedPath = string & Tag<"NormalizedPath">;
type AbsolutePath = string & Tag<"AbsolutePath">;
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
