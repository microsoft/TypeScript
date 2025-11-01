/// <reference path="fourslash.ts" />

// #37091

// @lib: dom
// @allowJs: true

// @Filename: globals.d.ts
//// declare var global: { console: Console };

// @Filename: index.js
//// window.f = function() { console/*1*/ }
//// self.g = function() { console/*2*/ }
//// global.h = function() { console/*3*/ }
//// globalThis.i = function() { console/*4*/ }

test.markerNames().forEach(marker => {
  verify.completions({
    marker,
    includes: [{
      name: "console",
      insertText: undefined,
      kind: "var",
      kindModifiers: "declare",
      sortText: completion.SortText.GlobalsOrKeywords
    }]
  }, {
    preferences: {
      includeInsertTextCompletions: true
    }
  });
});
