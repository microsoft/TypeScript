/// <reference path='fourslash.ts' />

// @strict: true

// @filename: index.ts
//// class MssqlClient {
////   /**
////    *
////    * @param {Object} - args
////    * @param {String} - args.parentTable
////    * @returns {Promise<{upStatement/**/, downStatement}>}
////    */
////   async relationCreate(args) {}
//// }
////
//// export default MssqlClient;

verify.completions({
  marker: "",
  exact: [{
    name: "readonly",
    sortText: completion.SortText.GlobalsOrKeywords,
  }],
  isNewIdentifierLocation: true,
});
