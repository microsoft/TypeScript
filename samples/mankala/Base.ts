///<reference path="Driver.ts"/>

module Base {
    export interface IList {
        isHead: boolean;
        next: IList;
        prev: IList;
        insertAfter(entry: IList): IList;
        insertBefore(entry: IList): IList;
        item();
        empty(): boolean;
    }

    export class List implements IList {
        next: IList;
        prev: IList;
        
        constructor (public isHead: boolean, public data) { }

        item() {
            return this.data;
        }

        empty(): boolean {
            return this.next == this;
        }

        insertAfter(entry: IList): IList {
            entry.next = this.next;
            entry.prev = this;
            this.next = entry;
            entry.next.prev = entry;
            return (entry);
        }

        insertBefore(entry: IList): IList {
            this.prev.next = entry;
            entry.next = this;
            entry.prev = this.prev;
            this.prev = entry;
            return entry;
        }
    }

    export function listMakeEntry(data): IList {
        var entry: List = new List(false, data);
        entry.prev = entry;
        entry.next = entry;
        return entry;
    }

    export function listMakeHead(): IList {
        var entry: List = new List(true, null);
        entry.prev = entry;
        entry.next = entry;
        return entry;
    }

    export function listRemove(entry: IList): IList {
        if (entry == null) {
            return null;
        }
        else if (entry.isHead) {
            return null;
        }
        else {
            entry.next.prev = entry.prev;
            entry.prev.next = entry.next;
        }
        return (entry);
    }
}
