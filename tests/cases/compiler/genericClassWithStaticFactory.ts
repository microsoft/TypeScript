module Editor {

    export class List<T> {
        public next: List<T>;
        public prev: List<T>;
        private listFactory: ListFactory<T>;

        constructor(public isHead: boolean, public data: T) {
            this.listFactory = new ListFactory<T>();
           
        }

        public add(data: T): List<T> {
            var entry = this.listFactory.MakeEntry(data);
            
            this.prev.next = entry;
            entry.next = this;
            entry.prev = this.prev;
            this.prev = entry;
            return entry;
        }

        public count(): number {
            var entry: List<T>;
            var i: number;

            entry = this.next;
            for (i = 0; !(entry.isHead); i++) {
                entry = entry.next;
            }

            return (i);
        }

        public isEmpty(): boolean {
            return (this.next == this);
        }

        public first(): T {
            if (this.isEmpty())
            {
                return this.next.data;
            }
            else {
                return null;
            }
        }

        public pushEntry(entry: List<T>): void {
            entry.isHead = false;
            entry.next = this.next;
            entry.prev = this;
            this.next = entry;
            entry.next.prev = entry; // entry.next.prev does not show intellisense, but entry.prev.prev does
        }

        public push(data: T): void {
            var entry = this.listFactory.MakeEntry(data);
            entry.data = data;
            entry.isHead = false;
            entry.next = this.next;
            entry.prev = this;
            this.next = entry;
            entry.next.prev = entry;  // entry.next.prev does not show intellisense, but entry.prev.prev does
        }

        public popEntry(head: List<T>): List<T> {
            if (this.next.isHead) {
                return null;
            }
            else {
                return this.listFactory.RemoveEntry(this.next);
            }
        }

        public insertEntry(entry: List<T>): List<T> {
            entry.isHead = false;
            this.prev.next = entry;
            entry.next = this;
            entry.prev = this.prev;
            this.prev = entry;
            return entry;
        }

        public insertAfter(data: T): List<T> {
            var entry: List<T> = this.listFactory.MakeEntry(data);
            entry.next = this.next;
            entry.prev = this;
            this.next = entry;
            entry.next.prev = entry;// entry.next.prev does not show intellisense, but entry.prev.prev does
            return entry;
        }

        public insertEntryBefore(entry: List<T>): List<T> {
            this.prev.next = entry;

            entry.next = this;
            entry.prev = this.prev;
            this.prev = entry;
            return entry;
        }

        public insertBefore(data: T): List<T> {
            var entry = this.listFactory.MakeEntry(data);
            return this.insertEntryBefore(entry);
        }
    }

    export class ListFactory<T> {

        public MakeHead<T>(): List<T> {
            var entry: List<T> = new List<T>(true, null);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }

        public MakeEntry<T>(data: T): List<T> {
            var entry: List<T> = new List<T>(false, data);
            entry.prev = entry;
            entry.next = entry;
            return entry;
        }

        public RemoveEntry<T>(entry: List<T>): List<T> {
            if (entry == null) {
                return null;
            }
            else if (entry.isHead) {
            // Can't remove the head of a list!
                return null;
            }
            else {
                entry.next.prev = entry.prev;
                entry.prev.next = entry.next;

                return entry;
            }
        }
    }
}