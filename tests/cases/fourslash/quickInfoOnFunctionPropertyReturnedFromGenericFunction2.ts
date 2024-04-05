/// <reference path="fourslash.ts" />

//// function createProps<T>(t: T) {
////   const getProps = function() {}
////   const createVariants = function() {}
////
////   getProps.createVariants = createVariants;
////   return getProps;
//// }
////
//// createProps({})./**/createVariants();

verify.quickInfoAt("", "(property) getProps<{}>.createVariants: () => void");
