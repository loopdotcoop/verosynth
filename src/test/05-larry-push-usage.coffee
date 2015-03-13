Main.test "
  Larry 'push()' usage"
Main.test ->
  new Larry
Main.test
  "Retrieve payload": (mock) -> [
    Main.eq, 55, ->
      mock.push { id:'id1', payload:55 }; mock.id1.payload ]
  "Count two objects": (mock) -> [
    Main.eq, 2, ->
      mock.push { id:'id2' }; mock.length ]
