var postcss = require('postcss');
var valueParse = require('postcss-value-parser')
var fs= require('fs');
 
var crypto = require('crypto');

module.exports = postcss.plugin('postcss-scoped-keyframes-for-wxmini-plugin', function() {
  return function(root) {
    let {file} = root.source.input
    file= file.replace(/\.css/,'.scss')
    const md5 = crypto.createHash('md5').update(fs.readFileSync(file), 'utf8').digest('hex');
    let cache = new Set()
    root.walk(function(node) {
      // 选收集 与 加uuid ,
      const {prop,name,type} = node
      if(type=='atrule' && /keyframes/i.test(name)){
        cache.add(node.params)
        node.params = `${node.params}-${md5}`
      }
    });

    root.walk(function(node){
      const {prop,name,type} = node
      if(type=='decl' && prop=='animation'){
          node.value=valueParse(node.value).walk((n)=>{
            if(n.type=='word' && cache.has(n.value)){
              n.value=`${n.value}-${md5}`
            }
          }).toString()
      }
    })
  };
});