(async () => { 
  postMessage({
    "hi": "world",
    "import.meta.url": import.meta.url,
    "sum": (await import("./plus")).plus(2, 3)
  })
})()
