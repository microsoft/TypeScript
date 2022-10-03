if (1)
    const enum A {}
else
    const enum B {}

do
    const enum C {}
while (0);

while (0)
    const enum D {}

for (;0;)
    const enum E {}

for (let _ in [])
    const enum F {}

for (let _ of [])
    const enum G {}

// @ts-ignore suppress `with` statement error
with (window)
    const enum H {}