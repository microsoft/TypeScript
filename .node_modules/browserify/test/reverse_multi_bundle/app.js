
t.equal(
    require("./shared")(), 1,
    "the main app bundle can already use the shared library"
);

t.throws(function() {
    require("./lazy");
}, "lazy bundle is not executed yet so the lazy module cannot be required yet");

// Use setTimeout as script loader simulator as in real use case this would be
// a call to one. Now we just let the rest of the source code string we build
// to execute.
setTimeout(function() {
    // After lazy bundle is executed we can require the lazy.js module
    require("./lazy");
    t.equal(
        require("./shared")(),3,
        "lazy module was able to use shared code"
    );
}, 1);

