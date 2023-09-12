import { Debug } from "../../debug";
import { Shared, SharedStructBase } from "../structs/sharedStruct";

/**
 * A shareable data structure that represents a doubly-linked list.
 * @internal
 */
@Shared()
export class SharedLinkedList<T extends Shareable> extends SharedStructBase {
    @Shared() head: SharedLinkedListNode<T> | undefined;
    @Shared() size: number;

    constructor(iterable?: Iterable<T>) {
        super();
        this.head = undefined;
        this.size = 0;
        if (iterable) {
            for (const value of iterable) {
                SharedLinkedList.push(this, value);
            }
        }
    }

    static size(list: SharedLinkedList<any>) {
        return list.size;
    }

    static firstNode<T extends Shareable>(list: SharedLinkedList<T>) {
        return list.head;
    }

    static lastNode<T extends Shareable>(list: SharedLinkedList<T>) {
        return list.head?.prev;
    }

    static previousNode<T extends Shareable>(node: SharedLinkedListNode<T>) {
        if (node.list && node !== node.list.head) {
            return node.prev;
        }
    }

    static nextNode<T extends Shareable>(node: SharedLinkedListNode<T>) {
        if (node.list && node !== node.list.head?.prev) {
            return node.next;
        }
    }

    static insertBeforeNode<T extends Shareable>(list: SharedLinkedList<T>, contextNode: SharedLinkedListNode<T> | undefined, newNode: SharedLinkedListNode<T>) {
        Debug.assert(!contextNode || contextNode.list === list);
        Debug.assert(!newNode.list);
        newNode.list = list;
        if (list.head === undefined) {
            newNode.next = newNode;
            newNode.prev = newNode;
            list.head = newNode;
        }
        else {
            if (contextNode === undefined) {
                contextNode = list.head;
                list.head = newNode;
            }
            else if (contextNode === list.head) {
                list.head = newNode;
            }
            newNode.next = contextNode;
            newNode.prev = contextNode.prev;
            contextNode.prev.next = newNode;
            contextNode.prev = newNode;
        }
        list.size++;
        return newNode;
    }

    static insertAfterNode<T extends Shareable>(list: SharedLinkedList<T>, contextNode: SharedLinkedListNode<T> | undefined, newNode: SharedLinkedListNode<T>) {
        Debug.assert(!contextNode || contextNode.list === list);
        Debug.assert(!newNode.list);
        newNode.list = list;
        if (list.head === undefined) {
            newNode.next = newNode;
            newNode.prev = newNode;
            list.head = newNode;
        }
        else {
            if (contextNode === undefined) {
                contextNode = list.head.prev!;
            }
            newNode.prev = contextNode;
            newNode.next = contextNode.next;
            contextNode.next.prev = newNode;
            contextNode.next = newNode;
        }
        list.size++;
        return newNode;
    }

    static pushNode<T extends Shareable>(list: SharedLinkedList<T>, node: SharedLinkedListNode<T>) {
        Debug.assert(!node.list);
        return this.insertAfterNode(list, /*contextNode*/ undefined, node);
    }

    static push<T extends Shareable>(list: SharedLinkedList<T>, value: T) {
        return this.pushNode(list, new SharedLinkedListNode(value));
    }

    static popNode<T extends Shareable>(list: SharedLinkedList<T>): SharedLinkedListNode<T> | undefined {
        const node = list.head?.prev;
        if (node && this.deleteNode(list, node)) {
            return node;
        }
    }

    static pop<T extends Shareable>(list: SharedLinkedList<T>): T | undefined {
        return this.popNode(list)?.value;
    }

    static unshiftNode<T extends Shareable>(list: SharedLinkedList<T>, node: SharedLinkedListNode<T>) {
        Debug.assert(!node.list);
        return this.insertBeforeNode(list, /*contextNode*/ undefined, node);
    }

    static unshift<T extends Shareable>(list: SharedLinkedList<T>, value: T) {
        return this.unshiftNode(list, new SharedLinkedListNode(value));
    }

    static shiftNode<T extends Shareable>(list: SharedLinkedList<T>): SharedLinkedListNode<T> | undefined {
        const node = list.head;
        if (node && this.deleteNode(list, node)) {
            return node;
        }
    }

    static shift<T extends Shareable>(list: SharedLinkedList<T>): T | undefined {
        return this.shiftNode(list)?.value;
    }

    static deleteNode<T extends Shareable>(list: SharedLinkedList<T>, node: SharedLinkedListNode<T>) {
        if (node.list !== list) {
            return undefined;
        }
        node.list = undefined;
        if (node.next === node) {
            Debug.assert(list.head === node);
            list.head = undefined;
        }
        else {
            node.next.prev = node.prev;
            node.prev.next = node.next;
            if (list.head === node) {
                list.head = node.next;
            }
        }
        node.next = node;
        node.prev = node;
        list.size--;
        return node;
    }

    static clear<T extends Shareable>(list: SharedLinkedList<T>) {
        while (list.head?.prev) {
            this.deleteNode(list, list.head.prev);
        }
    }

    static * nodes<T extends Shareable>(list: SharedLinkedList<T>) {
        let node: SharedLinkedListNode<T>;
        let next = list.head;
        if (next) {
            do {
                node = next;
                next = node.next;
                yield node;
            }
            while (next !== list.head);
        }
    }

    static * values<T extends Shareable>(list: SharedLinkedList<T>) {
        let node: SharedLinkedListNode<T>;
        let next = list.head;
        if (next) {
            do {
                node = next;
                next = node.next;
                yield node.value;
            }
            while (next !== list.head);
        }
    }
}

/** @internal */
@Shared()
export class SharedLinkedListNode<T extends Shareable> extends SharedStructBase {
    @Shared() list: SharedLinkedList<T> | undefined;
    @Shared() prev: SharedLinkedListNode<T>;
    @Shared() next: SharedLinkedListNode<T>;
    @Shared() value: T;

    constructor(value: T) {
        super();
        this.list = undefined;
        this.prev = this;
        this.next = this;
        this.value = value;
    }

    static previous<T extends Shareable>(node: SharedLinkedListNode<T>) {
        if (node.list && node !== node.list.head) {
            return node.prev;
        }
    }

    static next<T extends Shareable>(node: SharedLinkedListNode<T>) {
        if (node.list && node !== node.list.head?.prev) {
            return node.next;
        }
    }
}
