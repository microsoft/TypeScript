//@module: commonjs
//@declaration: true
export var x = 1;  // Makes this an external module
interface Iterator<T> {
}

module Query {
    export function fromDoWhile<T>(doWhile: (test: Iterator<T>) => boolean): Iterator<T> {
        return null;
    }

    function fromOrderBy() {
        return fromDoWhile(test => {
            return true;
        });
    }
}
