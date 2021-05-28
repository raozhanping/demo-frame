exports.log = (s, ...rest) => {
  const info = `
========= ${s} =========
`
  console.log(info, ...rest)
}
