/// <reference path="fourslash.ts" />

//// function createProps<T>(t: T) {
////   const getProps = () => {}
////   const createVariants = () => {}
////
////   getProps.createVariants = createVariants;
////   return getProps;
//// }
////
//// createProps({})./**/createVariants();

verify.quickInfoAt("", "(property) getProps<{}>.createVariants: () => void");
