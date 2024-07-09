module Editor {


    export class List<T> {
        public next: List<T>;
        public prev: List<T>;

        constructor(public isHead: boolean, public data: T) {
        
        }

        public static MakeHead(): List<T> { // should error
            var entry: List<T> = new List<T>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }        

        public static MakeHead2<T>(): List<T> { // should not error
            var entry: List<T> = new List<T>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }  

        public static MakeHead3<U>(): List<U> { // should not error
            var entry: List<U> = new List<U>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }  
    }
}