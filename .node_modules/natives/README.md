# natives

Do stuff with Node.js's native JavaScript modules

## Caveat

Dear Beloved User,

I feel compelled to give you a word of warning if you are considering
using this module.

This module lets you do some creative things with the JavaScript code
in Node.js.  There are some things here that are basically a recipe
for memory leaks, or at the very least, being broken with each new
release of Node, since none of these API surfaces are "technically"
"supported" by the team managing the Node.js project.

This module does not ship a _copy_ of Node's internals.  It does its
thing by using the exposed source code that lives in Node.js itself.
So, running this on different versions of Node.js will produce
different results.

When your program is broken by changes to Node's internals, or when
Node changes in such a way that this module becomes fundamentally
broken, you will likely get little sympathy.  Many people in the Node
community consider this sort of behavior to be unwise and unseemly, if
not outright hostile and morally wrong.

At the very least, you probably just want to run Node with the
(undocumented!) `--expose-internals` flag, rather than go to such
lengths.

Don't use unless you know what you're doing, or at least, are ok with
the risks.  Don't say I didn't warn you.

Eternally Yours in OSS,  
Isaac Z. Schlueter

## USAGE

```javascript
var natives = require('natives')

// get the source code
var fsCode = natives.source('fs')

// get a evaluated copy of the module
var fsCopy = natives.require('fs')

// you can pass in a whitelist to NOT shim certain things
var fsCopyWithNativeStreams = natives.require('fs', ['stream'])

// note that this is not the same as the "real" fs
assert(fsCopy !== require('fs'))

// but it does have all the same entries
fsCopy.readFileSync(__filename, 'utf8') // etc
```

## Another Caveat

You can't use this to override `require("buffer")` because everything
depends on `Buffer.isBuffer` working properly, so it's important for
that one to be given a pass.
