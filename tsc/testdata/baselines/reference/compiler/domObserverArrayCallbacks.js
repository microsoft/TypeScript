//// [tests/cases/compiler/domObserverArrayCallbacks.ts] ////

//// [domObserverArrayCallbacks.ts]
new ResizeObserver(entries => entries[0]);
new MutationObserver(records => records.some(record => record.attributeName === "style"));
new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting));


//// [domObserverArrayCallbacks.js]
"use strict";
new ResizeObserver(entries => entries[0]);
new MutationObserver(records => records.some(record => record.attributeName === "style"));
new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting));
