class Shape {
    id: number;
}

module Shape.Utils {
    export function convert(): Shape { return null;}
}

class Path extends Shape {
    name: string;

}

module Path.Utils {
    export function convert2(): Path {
        return null;
    }
}



