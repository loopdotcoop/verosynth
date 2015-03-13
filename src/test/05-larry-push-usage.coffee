test.section "Larry 'push()' usage"

test.eq [

  -> new Larry # define `larry`

  "Retrieve payload"
  55
  (larry) -> larry.push { id:'id1', payload:55 }; larry.id1.payload

  "Count two objects"
  2
  (larry) -> larry.push { id:'id2' }; larry.length

]

