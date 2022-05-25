const babel = 5;
const plugins = 5;

babel === plugins;

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function randomString(): Promise<string> {
  return 'random'
}

async function funTimes() {
  await sleep(5000);
  await sleep(5000);

  await Promise.all([
    // first sleep
    sleep(5000),
    // second sleep
    sleep(5000),
  ]);

  concurrent {
    await sleep(5000);
    await sleep(5000);
  }

  /**
   await Promise.all([
     sleep(5000),
     sleep(5000),
   ])
   */

  const hello = 'world';
  let hi = 'world';
  
  const [firstStringA,,secondStringA] = await Promise.all([
    randomString(),
    sleep(5000),
    randomString(),
  ])

  concurrent {
    const firstString = await randomString();
    await sleep(5000);
    const secondString = await randomString();
  }

  concurrent {
    let firstStringLet = await randomString();
    await sleep(5000);
    const secondStringLet = await randomString();
  }

  /**
   const [,myString] = await Promise.all([
     sleep(5000),
     randomString(),
   ])
   */
}

