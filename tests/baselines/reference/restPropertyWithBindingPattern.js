//// [tests/cases/conformance/es6/destructuring/restPropertyWithBindingPattern.ts] ////

//// [restPropertyWithBindingPattern.ts]
({...{}} = {});
({...({})} = {});
({...[]} = {});
({...([])} = {});

//// [restPropertyWithBindingPattern.js]
({ ...{} } = {});
({ ...({}) } = {});
({ ...[] } = {});
({ ...([]) } = {});
