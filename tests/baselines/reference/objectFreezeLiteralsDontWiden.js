//// [tests/cases/compiler/objectFreezeLiteralsDontWiden.ts] ////

//// [objectFreezeLiteralsDontWiden.ts]
const PUPPETEER_REVISIONS = Object.freeze({
  chromium: '1011831',
  firefox: 'latest',
});

let preferredRevision = PUPPETEER_REVISIONS.chromium;
preferredRevision = PUPPETEER_REVISIONS.firefox;


//// [objectFreezeLiteralsDontWiden.js]
var PUPPETEER_REVISIONS = Object.freeze({
    chromium: '1011831',
    firefox: 'latest',
});
var preferredRevision = PUPPETEER_REVISIONS.chromium;
preferredRevision = PUPPETEER_REVISIONS.firefox;
