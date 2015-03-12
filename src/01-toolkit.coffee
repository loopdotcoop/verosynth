log = console.log.bind console # http://stackoverflow.com/a/12945064

$  = document.querySelector.bind document # http://stackoverflow.com/a/12637169
$$ = document.querySelectorAll.bind document

make = (tag, attr, inner) ->
  el = document.createElement tag
  for k,v of attr
    if '_' != k.substr 0, 1 # do not add an attribute whose name begins with an underscore, eg '_bind'
      el.setAttribute k, v
  if inner then el.innerHTML = inner
  return el

empty = (node) ->
  while node.hasChildNodes()
    node.removeChild node.lastChild
