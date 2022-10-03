// @strict: true

declare const o1: undefined | { b: string };
delete o1?.b;
delete (o1?.b);

declare const o2: undefined | { b: { c: string } };
delete o2?.b.c;
delete (o2?.b.c);

declare const o3: { b: undefined | { c: string } };
delete o3.b?.c;
delete (o3.b?.c);

declare const o4: { b?: { c: { d?: { e: string } } } };
delete o4.b?.c.d?.e;
delete (o4.b?.c.d)?.e;
delete (o4.b?.c.d?.e);

declare const o5: { b?(): { c: { d?: { e: string } } } };
delete o5.b?.().c.d?.e;
delete (o5.b?.().c.d?.e);

declare const o6: { b?: { c: { d?: { e: string } } } };
delete o6.b?.['c'].d?.['e'];
delete (o6.b?.['c'].d?.['e']);