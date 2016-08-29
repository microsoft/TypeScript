interface Square {
    sub: {kind: 'square'; };
    /*'0': {
        sub: {
            under: {
                kind: "square"
            }
        }
    };*/
    size: number;
}

interface Rectangle {
    /*'0': {
        sub: {
            under: {
                kind: "rectangle"
            }
        }
    };*/
    sub: { kind: 'rectangle'; };
    width: number;
    height: number;
}

interface Circle {
    /*'0': {
        sub: {
            under : {
                kind: "circle"
            }
        }
    };*/
    sub: { kind: 'circle'; };
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    switch(s.sub.kind) {
    //switch (s[0].sub['under']['kind']) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}
