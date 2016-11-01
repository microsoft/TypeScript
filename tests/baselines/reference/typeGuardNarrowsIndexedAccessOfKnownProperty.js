//// [typeGuardNarrowsIndexedAccessOfKnownProperty.ts]
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;
interface Subshape {
    "0": {
        sub: {
            under: {
                shape: Shape;
            }
        }
    }
}
function area(s: Shape): number {
    switch(s['kind']) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}

function subarea(s: Subshape): number {
    switch(s[0]["sub"].under["shape"]["kind"]) {
        case "square": return s[0].sub.under.shape.size * s[0].sub.under.shape.size;
        case "rectangle": return s[0]["sub"]["under"]["shape"]["width"] * s[0]["sub"]["under"]["shape"].height;
        case "circle": return Math.PI * s[0].sub.under["shape"].radius * s[0]["sub"].under.shape["radius"];
    }
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty.js]
function area(s) {
    switch (s['kind']) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}
function subarea(s) {
    switch (s[0]["sub"].under["shape"]["kind"]) {
        case "square": return s[0].sub.under.shape.size * s[0].sub.under.shape.size;
        case "rectangle": return s[0]["sub"]["under"]["shape"]["width"] * s[0]["sub"]["under"]["shape"].height;
        case "circle": return Math.PI * s[0].sub.under["shape"].radius * s[0]["sub"].under.shape["radius"];
    }
}
