//// [constDeclarations-invalidContexts.ts]
// Errors, const must be defined inside a block
if (true) 
    const c1 = 0;
else 
    const c2 = 0;

while (true) 
    const c3 = 0;

do 
    const c4 = 0;
while (true);

var obj;
with (obj) 
    const c5 = 0;  // No  Error will be reported here since we turn off all type checking

for (var i = 0; i < 10; i++)
    const c6 = 0;

for (var i2 in {}) 
    const c7 = 0;

if (true) 
    label: const c8 = 0;

while (false)
    label2: label3: label4: const c9 = 0;





//// [constDeclarations-invalidContexts.js]
// Errors, const must be defined inside a block
if (true)
    const c1 = 0;
else
    const c2 = 0;
while (true)
    const c3 = 0;
do
    const c4 = 0;
while (true);
var obj;
with (obj)
    const c5 = 0; // No  Error will be reported here since we turn off all type checking
for (var i = 0; i < 10; i++)
    const c6 = 0;
for (var i2 in {})
    const c7 = 0;
if (true)
    label: const c8 = 0;
while (false)
    label2: label3: label4: const c9 = 0;
