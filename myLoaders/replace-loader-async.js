//loader就是一个函数，但不能为箭头函数
// loader必须有返回值
// this.callback 处理多种信息
// this.async 处理异步逻辑
module.exports = function (source) {
  console.log("async", this.query, source);
  const callback = this.async();
  setTimeout(() => {
    const content = source.replace("hello", "哈哈哈哈");
    callback(null, content);
    // null
  }, 3000);
  // 参数err,content, sourcemap
  // this.callback(null, content);
  //   return source.replace("hello", this.query.name);
};
