test.section "Pref constructor usage"

test.eq [

  ->
    app.prefs = new Larry # clean up after previous tests
    new Pref { id:'pref1' }

  "new Pref is recorded in `app.prefs`"
  true
  (pref) -> pref == app.prefs.pref1

]

