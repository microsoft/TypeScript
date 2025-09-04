class Shape {
    id: number;
}

namespace Shape.Utils {
    export function convert(): Shape { return null;}
}

class Path extends Shape {
    name: string;

}

namespace Path.Utils {
    export function convert2(): Path {
        return null;
    }
}



