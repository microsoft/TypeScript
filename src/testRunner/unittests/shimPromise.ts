describe("unittests:: createPromiseShim", () => {
    function expectFulfilled<T>(done: Mocha.Done, value: T) {
        return (_value: T) => {
            try {
                assert.strictEqual(_value, value);
            }
            catch (e) {
                return done(e);
            }
            done();
        };
    }

    function expectNotFulfilled(done: Mocha.Done) {
        return () => done(new Error("expected promise to be rejected"));
    }

    function expectNotRejected(done: Mocha.Done) {
        return (_reason: any) => done(_reason);
    }

    function expectRejected(done: Mocha.Done, reason: any) {
        return (_reason: any) => {
            try {
                assert.strictEqual(_reason, reason);
            }
            catch (e) {
                return done(e);
            }
            done();
        };
    }

    it("executor resolves correctly with non-promise", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = {};
        new PromiseShim(resolve => resolve(value)).then(
            expectFulfilled(done, value),
            expectNotRejected(done)
        );
    }).timeout(500);

    it("executor resolves correctly with promise", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = { };
        const p = { then(cb: (v: {}) => void) { cb(value); } };
        new PromiseShim(resolve => resolve(p)).then(
            expectFulfilled(done, value),
            expectNotRejected(done)
        );
    }).timeout(500);

    it("executor rejects correctly", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = { };
        new PromiseShim((_, reject) => reject(value)).then(
            expectNotFulfilled(done),
            expectRejected(done, value)
        );
    }).timeout(500);

    it("catches error in executor", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = {};
        new PromiseShim(() => { throw value; }).then(
            expectNotFulfilled(done),
            expectRejected(done, value)
        );
    }).timeout(500);

    it("catches error in onfulfilled of 'then'", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = {};
        new PromiseShim(resolve => resolve(/*value*/ undefined)).then(
            () => { throw value; },
            expectNotRejected(done)
        ).then(
            expectNotFulfilled(done),
            expectRejected(done, value)
        );
    }).timeout(500);

    it("catches error in onrejected of 'then'", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const first = {};
        const second = {};
        new PromiseShim((_, reject) => reject(first)).then(
            expectNotFulfilled(done),
            _ => { throw second; }
        ).then(
            expectNotFulfilled(done),
            expectRejected(done, second)
        );
    }).timeout(500);

    it("Promise.resolve resolves correctly with non-promise", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = {};
        PromiseShim.resolve(value).then(
            expectFulfilled(done, value),
            expectNotRejected(done)
        );
    }).timeout(500);

    it("Promsie.resolve resolves correctly with promise", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = { };
        const p = { then(cb: (v: {}) => void) { cb(value); } };
        PromiseShim.resolve(p).then(
            expectFulfilled(done, value),
            expectNotRejected(done)
        );
    }).timeout(500);

    it("Promsie.resolve returns same promise if instance", () => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = { };
        const first = PromiseShim.resolve(value);
        const second = PromiseShim.resolve(first);
        assert.strictEqual(first, second);
    });

    it("Promise.reject rejects correctly", done => {
        const PromiseShim = ts.createPromiseShim(); // tslint:disable-line variable-name
        const value = { };
        PromiseShim.reject(value).then(
            expectNotFulfilled(done),
            expectRejected(done, value)
        );
    }).timeout(500);
});