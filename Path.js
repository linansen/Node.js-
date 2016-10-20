
const path=require('path');
/***
  function : path.basename(path[, ext])
  description: return the last portion of the path .
***/
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// returns 'quux.html'

console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
// returns 'quux'

/***
  function: path.delimiter
  description: platform-specific paramater path delimiter,if in *nix,it is : ,else in window , it is ;
***/
var pathArr=process.env.PATH.split(path.delimiter);


/***
  function: path.dirname() 
  description: return the directory of a path ,it  is similar with the unix or linux command dirname
***/

path.dirname('/foo/bar/baz/asdf/quux');

/****
  function : path.extname()
  description: return the estension of path ,from the last '.' to the end of the last portion of the path. 
****/
path.extname('index.html');
// returns '.html'

path.extname('index.coffee.md');
// returns '.md'

path.extname('index.');
// returns '.'

path.extname('index');
// returns ''

path.extname('.index');
// returns ''



