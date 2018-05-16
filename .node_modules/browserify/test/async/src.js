function f (x) { return new Promise(resolve => {
  process.nextTick(() => { resolve(x) }) }) }

async function add (x) {
  return x + await f(20) + await f(30)
}

add(10).then(v => { console.log(v) })
