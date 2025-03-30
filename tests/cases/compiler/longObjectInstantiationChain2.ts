// @strict: true
// @noEmit: true

type merge<base, props> = Omit<base, keyof props & keyof base> & props;

type Type<t> = {
  shape: t;
  merge: <r>(r: r) => Type<merge<t, r>>;
};

declare const o1: Type<{ p1: 1 }>;

const o2 = o1.merge({ p2: 2 });
const o3 = o2.merge({ p3: 3 });
const o4 = o3.merge({ p4: 4 });
const o5 = o4.merge({ p5: 5 });
const o6 = o5.merge({ p6: 6 });
const o7 = o6.merge({ p7: 7 });
const o8 = o7.merge({ p8: 8 });
const o9 = o8.merge({ p9: 9 });
const o10 = o9.merge({ p10: 10 });
const o11 = o10.merge({ p11: 11 });
const o12 = o11.merge({ p12: 12 });
const o13 = o12.merge({ p13: 13 });
const o14 = o13.merge({ p14: 14 });
const o15 = o14.merge({ p15: 15 });
const o16 = o15.merge({ p16: 16 });
const o17 = o16.merge({ p17: 17 });
const o18 = o17.merge({ p18: 18 });
const o19 = o18.merge({ p19: 19 });
const o20 = o19.merge({ p20: 20 });
const o21 = o20.merge({ p21: 21 });
const o22 = o21.merge({ p22: 22 });
const o23 = o22.merge({ p23: 23 });
const o24 = o23.merge({ p24: 24 });
const o25 = o24.merge({ p25: 25 });
const o26 = o25.merge({ p26: 26 });
const o27 = o26.merge({ p27: 27 });
const o28 = o27.merge({ p28: 28 });
const o29 = o28.merge({ p29: 29 });
const o30 = o29.merge({ p30: 30 });
const o31 = o30.merge({ p31: 31 });
const o32 = o31.merge({ p32: 32 });
const o33 = o32.merge({ p33: 33 });
const o34 = o33.merge({ p34: 34 });
const o35 = o34.merge({ p35: 35 });
const o36 = o35.merge({ p36: 36 });
const o37 = o36.merge({ p37: 37 });
const o38 = o37.merge({ p38: 38 });
const o39 = o38.merge({ p39: 39 });
const o40 = o39.merge({ p40: 40 });
const o41 = o40.merge({ p41: 41 });
const o42 = o41.merge({ p42: 42 });
const o43 = o42.merge({ p43: 43 });
const o44 = o43.merge({ p44: 44 });
const o45 = o44.merge({ p45: 45 });
const o46 = o45.merge({ p46: 46 });
const o47 = o46.merge({ p47: 47 });
const o48 = o47.merge({ p48: 48 });
const o49 = o48.merge({ p49: 49 });
const o50 = o49.merge({ p50: 50 });

o1.shape.p1;
o1.shape.p51; // error

o2.shape.p1;
o2.shape.p2;
o2.shape.p3; // error

o25.shape.p1;
o25.shape.p10;
o25.shape.p25;

o30.shape.p1;
o30.shape.p31;
o30.shape.p38; // error
o30.shape.p50; // error

o50.shape.p1;
o50.shape.p31;
o50.shape.p38;
o50.shape.p50;
