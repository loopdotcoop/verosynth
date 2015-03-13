Main.test "
  Larry 'push()' exceptions"
Main.test ->
  new Larry
Main.test
  "Push null": (mock) -> [
    Main.throws, "'obj' is null", ->
      mock.push null ]
  "Push nothing": (mock) -> [
    Main.throws, "'obj' is type 'undefined', not 'object'", ->
      mock.push() ]
  "Push a number": (mock) -> [
    Main.throws, "'obj' is type 'number', not 'object'", ->
      mock.push 123 ]
  "Push an empty object": (mock) -> [
    Main.throws, "[object Object] `id` is missing", ->
      mock.push {} ]
  "Push an id number 1": (mock) -> [
    Main.throws, "[object Object] `id` is type 'number', not 'string'", ->
      mock.push { id:1 } ]
  "Push an id string '1'": (mock) -> [
    Main.throws, "[object Object] `id` '1' fails /^[a-z][-a-z0-9]+$/", ->
      mock.push { id:'1' } ]
  "Push an id string 'a'": (mock) -> [
    Main.throws, "[object Object] `id` 'a' fails /^[a-z][-a-z0-9]+$/", ->
      mock.push { id:'a' } ]
  "Push a duplicate id": (mock) ->
    mock.push { id:'a1' }
    [ Main.throws, "Duplicate [object Object] `id` 'a1'", ->
      mock.push { id:'a1' } ]


