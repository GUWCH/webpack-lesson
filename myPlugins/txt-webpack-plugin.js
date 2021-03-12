const path = require("path");
const fs = require("fs");

function mapDir(dir, callback, finish) {
  let str = "";
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((filename, index) => {
      str += filename + ",";
      let pathname = path.join(dir, filename);
      fs.stat(pathname, (err, stats) => {
        // 读取文件信息
        if (err) {
          console.log("获取文件stats失败");
          return;
        }
        if (stats.isDirectory()) {
          // console.log("stats", stats.isDirectory());
          mapDir(pathname, callback(str), finish);
        } else if (stats.isFile()) {
          if ([".json", ".less"].includes(path.extname(pathname))) {
            // 排除 目录下的 json less 文件
            return;
          }
          fs.readFile(pathname, (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            callback && callback(str, data);
          });
        }
      });
      if (index === files.length - 1) {
        finish && finish(str);
      }
    });
  });
}

class TxtWebpackPlugin {
  // apply函数 帮助插件注册，接收complier类
  constructor(options) {
    console.log(options);
  }

  apply(complier) {
    mapDir(
      "./dist",
      function (str, file) {
        //TODO
      },
      function (nameStr) {
        complier.hooks.emit.tapAsync("TxtWebpackPlugin", (compilation, cb) => {
          compilation.assets["fileList.txt"] = {
            source: function () {
              // 定义文件的内容
              return nameStr;
            },
            size: function () {
              // 定义文件的体积
              return 1024;
            },
          };
          cb();
        });

        complier.hooks.compile.tap("TxtWebpackPlugin", (compilation) => {
          console.log("哈哈 我是一个同步的钩子");
        });
      }
    );
  }
}

module.exports = TxtWebpackPlugin;
