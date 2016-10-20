
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

/**** 
  function: path.format(pathObject)
  decription :return the path string from a pathObject,it is opposite of path.parse.
              if the pathObject supplied the dir property and the base property,it return the string which 
              is concatenation of the dir , platform-dependent path delimiter and the base property.
              else if the dir property of pathObject hasnot supplied ,but the root property of the pathObject had existed.
              u will use the root property instead of the dir property.
              else if the dir and the root property of the pathObject are not supplied,the return string is just the content 
              of the base property of the pathObject.
              else if the dir and the base property are not supplied, a concatenation of the name property and
              the ext property will be used as the base property.
****/
// If `dir` and `base` are provided, `dir` + platform separator + `base`
// will be returned.
path.format({
    dir: '/home/user/dir',
    base: 'file.txt'
});
// returns '/home/user/dir/file.txt'

// `root` will be used if `dir` is not specified.
// `name` + `ext` will be used if `base` is not specified.
// If only `root` is provided or `dir` is equal to `root` then the
// platform separator will not be included.
path.format({
    root: '/',
    base: 'file.txt'
});
// returns '/file.txt'

path.format({
    dir: '/',
    root: '/',
    name: 'file',
    ext: '.txt'
});
// returns '/file.txt'

// `base` will be returned if `dir` or `root` are not provided.
path.format({
    base: 'file.txt'
});
// returns 'file.txt'





