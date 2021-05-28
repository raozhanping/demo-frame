{
  'targets': [{
    'target_name': 'hello',
      'sources': [
        './hello/hello.cc'
      ],
      'conditions':[
        ['OS == "win"', {
          'libraries': ['-lnode.lib']
        }]
      ]
  }]
}
