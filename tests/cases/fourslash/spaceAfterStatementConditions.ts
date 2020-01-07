/// <reference path="fourslash.ts"/>

////let i = 0;
////
////if(i<0) ++i;
////if(i<0) --i;
////
////while(i<0) ++i;
////while(i<0) --i;
////
////do ++i;
////while(i<0)
////do --i;
////while(i<0)
////
////for(let prop in { foo: 1 }) ++i;
////for(let prop in { foo: 1 }) --i;
////
////for(let foo of [1, 2]) ++i;
////for(let foo of [1, 2]) --i;
////
////for(let j = 0; j < 10; j++) ++i;
////for(let j = 0; j < 10; j++) --i;
////

format.document();
verify.currentFileContentIs(
`let i = 0;

if (i < 0) ++i;
if (i < 0) --i;

while (i < 0) ++i;
while (i < 0) --i;

do ++i;
while (i < 0)
do --i;
while (i < 0)

for (let prop in { foo: 1 }) ++i;
for (let prop in { foo: 1 }) --i;

for (let foo of [1, 2]) ++i;
for (let foo of [1, 2]) --i;

for (let j = 0; j < 10; j++) ++i;
for (let j = 0; j < 10; j++) --i;
`);
