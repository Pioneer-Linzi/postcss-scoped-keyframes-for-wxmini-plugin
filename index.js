var postcss = require('postcss');
var UUID = require('uuidjs');
var valueParse = require('postcss-value-parser')

module.exports = postcss.plugin('postcss-scoped-keyframes-for-wxmini-plugin', function() {
  return function(root) {
    let uid = UUID.generate();
    let cache = new Set()
    root.walk(function(node) {
      // 选收集 与 加uuid ,
      const {prop,name,type} = node
      if(type=='atrule' && /keyframes/i.test(name)){
        cache.add(node.params)
        node.params = `${node.params}-${uid}`
      }
    });

    root.walk(function(node){
      const {prop,name,type} = node
      if(type=='decl' && prop=='animation'){
          node.value=valueParse(node.value).walk((n)=>{
            if(n.type=='word' && cache.has(n.value)){
              n.value=`${n.value}-${uid}`
            }
          }).toString()
      }
    })
  };
});