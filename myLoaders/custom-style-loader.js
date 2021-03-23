module.exports = function (source) {
  // 生成style标签
  return `const tag = document.createElement('style');
        tag.innerHTML = ${source};
        document.head.appendChild(tag)
    `;
};
