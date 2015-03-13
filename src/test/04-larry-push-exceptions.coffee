test.section "Larry `push()` exceptions"

test.throws [

  -> new Larry # define `larry`

  "Push null"
  "'obj' is null"
  (larry) -> larry.push null

  "Push nothing"
  "'obj' is type 'undefined', not 'object'"
  (larry) -> larry.push()

  "Push a number"
  "'obj' is type 'number', not 'object'"
  (larry) -> larry.push 123

  "Push an empty object"
  "[object Object] `id` is missing"
  (larry) -> larry.push {}

  "Push an id number 1"
  "[object Object] `id` is type 'number', not 'string'"
  (larry) -> larry.push { id:1 }

  "Push an id string '1'"
  "[object Object] `id` '1' fails /^[a-z][-a-z0-9]+$/"
  (larry) -> larry.push { id:'1' }

  "Push an id string 'a'"
  "[object Object] `id` 'a' fails /^[a-z][-a-z0-9]+$/"
  (larry) -> larry.push { id:'a' }
  
  (larry) -> larry.push { id:'a1' }; larry # modify `larry`

  "Push a duplicate id"
  "Duplicate [object Object] `id` 'a1'"
  (larry) -> larry.push { id:'a1' }

]

