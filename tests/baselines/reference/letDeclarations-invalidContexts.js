//// [letDeclarations-invalidContexts.ts]
// Errors, let must be defined inside a block
if (true) 
    let l1 = 0;
else 
    let l2 = 0;

while (true) 
    let l3 = 0;

do 
    let l4 = 0;
while (true);

var obj;
with (obj) 
    let l5 = 0;

for (var i = 0; i < 10; i++)
    let l6 = 0;

for (var i2 in {}) 
    let l7 = 0;

if (true) 
    label: let l8 = 0;

while (false)
    label2: label3: label4: let l9 = 0;





//// [letDeclarations-invalidContexts.js]
// Errors, let must be defined inside a block
if (true)
    let l1 = 0;
else
    let l2 = 0;
while (true)
    let l3 = 0;
do
    let l4 = 0;
while (true);
var obj;
with (obj)
    let l5 = 0;
for (var i = 0; i < 10; i++)
    let l6 = 0;
for (var i2 in {})
    let l7 = 0;
if (true)
    label: let l8 = 0;
while (false)
    label2: label3: label4: let l9 = 0;
