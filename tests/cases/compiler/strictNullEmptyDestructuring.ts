// @strictNullChecks: true

// Repro from #20873

let [] = null;

let { } = null;

({} = null);

let { } = undefined;

({} = undefined);

let { } = Math.random() ? {} : null;

({} = Math.random() ? {} : null);

let { } = Math.random() ? {} : undefined;

({} = Math.random() ? {} : undefined);

let { } = Math.random() ? null : undefined;

({} = Math.random() ? null : undefined);
