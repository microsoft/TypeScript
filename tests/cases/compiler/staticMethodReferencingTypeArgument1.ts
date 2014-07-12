module Editor {
    export class List<T> {
        next: List<T>;
        prev: List<T>;

        constructor(public isHead: boolean, public data: T) {
        }

        static MakeHead(): List<T> {
            var entry: List<T> = new List<T>(true, null); // can't access T here
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }
    }
}