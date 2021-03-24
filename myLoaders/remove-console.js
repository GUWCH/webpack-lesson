//将源代码解析成AST
const parser = require("@babel/parser");
//对AST节点进行递归遍历，生成一个便于操作、转换的path对象
const traverse = require("@babel/traverse").default;
//将AST解码回js代码
const generator = require("@babel/generator").default;
//对具体的AST节点进行增删改查
const bableTypes = require("@babel/types");

module.exports = function (source) {
  const ast = parser.parse(source, { sourceType: "module" });
  console.log("remove---", ast);
  traverse(ast, {
    CallExpression(path) {
      //如果节点类型为CallExpression ,则会执行此函数,我们的console的type就是这个
      // 使用bableTypes 来对node节点的类型做判断,如果节点的整体类型为MemberExpression,并且子节点object的类型为Identifier,同时节点中的name又为console
      if (
        bableTypes.isMemberExpression(path.node.callee) &&
        bableTypes.isIdentifier(path.node.callee.object, { name: "console" })
      ) {
        // 那么将这个节点删除掉
        path.remove();
      }
    },
  });
  let output = generator(ast, {}); // 通过@babel/generator将AST重新解码回js
  return output.code;
};
