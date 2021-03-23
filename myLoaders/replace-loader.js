//loader就是一个函数，但不能为箭头函数
// loader必须有返回值
// this.callback 处理多种信息
// this.async 处理异步逻辑
module.exports = function (source) {
  //   console.log(this, this.query, source);

  return source.replace("world", "funny");
};
