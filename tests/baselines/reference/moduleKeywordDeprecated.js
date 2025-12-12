//// [tests/cases/compiler/moduleKeywordDeprecated.ts] ////

//// [foo.ts]
// Error
module notok { }
module not.ok { }
declare module bad { }
declare module also.bad { }

// Still the only way to do it
declare module "good" { }

//// [decl.d.ts]
declare module foo { }
declare module foo.bar { }

// Still the only way to do it
declare module "alsogood" { }

export module exported { }
export module exported.sub { }


//// [foo.js]
