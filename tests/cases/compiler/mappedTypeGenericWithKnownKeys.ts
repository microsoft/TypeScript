// @noEmit: true
// @strict: true

// based on #50054

function test<Shape extends Record<string, string>>(shape: Shape, key: keyof Shape) {
    const obj = {} as Record<keyof Shape | "knownLiteralKey", number>;

    obj.knownLiteralKey = 1;
    obj[key] = 2;

    obj.unknownLiteralKey = 3; // error
    obj['' as string] = 4; // error
}
