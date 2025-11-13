// @strict: true
// @noEmit: true

type Shape =
    | { kind: "circle", radius: number }
    | { kind: "square", sideLength: number }

function wat(shape: Shape) {
    switch (true) {
        case shape.kind === "circle":
            return Math.PI * shape.radius ** 2;
        case shape.kind === "circle": // should error
    }

    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
    else if (shape.kind === "circle") {
        //         ~~~~
        // Property 'kind' does not exist on type 'never'.
    }
}
