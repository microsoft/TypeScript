//// [objectLitPropertyScoping.ts]
// Should compile, x and y should not be picked up from the properties

function makePoint(x: number, y: number) {
    return {
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        dist: function () {
            return Math.sqrt(x * x + y * y);
        }
    }
};

//// [objectLitPropertyScoping.js]
// Should compile, x and y should not be picked up from the properties
function makePoint(x, y) {
    return {
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        dist: function () {
            return Math.sqrt(x * x + y * y);
        }
    };
}
;
