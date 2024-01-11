// repro from https://github.com/microsoft/TypeScript/issues/54769

for (let [x = 'a' in {}] = []; !x; x = !x) console.log(x)
for (let {x = 'a' in {}} = {}; !x; x = !x) console.log(x)
