// @filename: foo.ts

// Error
module notok { }
module not.ok { }

// OK
declare module fine { }
declare module also.fine { }

// Still the only way to do it
declare module "good" { }

// @filename: decl.d.ts

// OK since these are ambient
declare module foo { }
declare module foo.bar { }

// Still the only way to do it
declare module "alsogood" { }

export module exported { }
export module exported.sub { }
