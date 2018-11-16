const [...a,] = [];
const {...b,} = {};
let c, d;
([...c,] = []);
({...d,} = {});

// Allowed for non-rest elements
const [e,] = <any>[];
const {f,} = <any>{};
let g, h;
([g,] = <any>[]);
({h,} = <any>{});
