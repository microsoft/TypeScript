// @noEmit: true

// repro #49643

interface A {}
interface B {}

declare let opts:
   | { objectRef?: undefined; getObjectRef: () => any }
   | { objectRef: A | B; getObjectRef?: undefined };

opts.objectRef || opts.getObjectRef();
