module.exports = function case0(Benchmark) {
  var suite = new Benchmark.Suite()

  // add tests
  suite
    .add('RegExp#test', function() {
      ;/o/.test('Hello World!')
    })
    .add('String#indexOf', function() {
      // eslint-disable-next-line no-unused-expressions
      'Hello World!'.indexOf('o') > -1
    })
    .add('String#match', function() {
      // eslint-disable-next-line no-unused-expressions
      !!'Hello World!'.match(/o/)
    })
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target))
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    // run async
    .run({ async: true })
}
