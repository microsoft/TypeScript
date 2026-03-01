/// <reference path='fourslash.ts' />

// @strict: true
// @checkJs: true
// @allowJs: true

// @filename: index.js
//// /**
////  * @example
////   <file name="glyphicons.css">
////     @import url(//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css);
////   </file>
////   <example module="ngAnimate" deps="angular-animate.js" animations="true">
////     <file name="animations.css">
////       .animate-show.ng-hide-add.ng-hide-add-active,
////       .animate-show.ng-hide-remove.ng-hide-remove-active {
////         transition:all linear 0./**/5s;
////       }
////     </file>
////   </example>
////  */
//// var ngShowDirective = ['$animate', function($animate) {}];

verify.completions({
  marker: "",
  includes: ["url"],
  isNewIdentifierLocation: true,
  preferences: {
    includeCompletionsWithInsertText: true
  }
});
