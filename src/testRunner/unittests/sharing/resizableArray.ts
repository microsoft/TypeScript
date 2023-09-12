import { Membrane, ProxyResizableArray } from "../../_namespaces/ts";

describe("unittests:: resizableArray", () => {
    it("push", () => {
        const membrane = new Membrane();
        const array = new ProxyResizableArray(membrane);
        array.push(1);
    });
});