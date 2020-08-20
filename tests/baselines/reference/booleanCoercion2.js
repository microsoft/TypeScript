//// [booleanCoercion2.ts]
declare const trueValue: true;
declare let booleanValue: boolean;

while (true) {
    break;
}

for (; true;) {
    break;
}

do {
    break;
} while (true)

while (trueValue) {
    break;
}

while (booleanValue) {
    break;
}

while (booleanValue) {
    while (booleanValue) {
        booleanValue = false;
    }
}

if (booleanValue) {
    if (booleanValue) {
        booleanValue = false;
    }
}


//// [booleanCoercion2.js]
while (true) {
    break;
}
for (; true;) {
    break;
}
do {
    break;
} while (true);
while (trueValue) {
    break;
}
while (booleanValue) {
    break;
}
while (booleanValue) {
    while (booleanValue) {
        booleanValue = false;
    }
}
if (booleanValue) {
    if (booleanValue) {
        booleanValue = false;
    }
}
