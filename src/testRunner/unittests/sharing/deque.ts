import { Deque } from "../../_namespaces/ts";

describe("unittests:: sharing:: workStealingDeque", () => {
    describe("pushBottom", () => {
        it("push first item", () => {
            const deque = new Deque<number>();
            Deque.push(deque, 1);
        });
    });
});