// const webpack = require("webpack");
// const webpackConfig = require("../webpack.config.js");

// const compiler = webpack(webpackConfig);
// Object.keys(compiler.hooks).forEach((hookName) => {
//   compiler.hooks[hookName].tap("laohan", () => {
//     console.log(`run ------ > ${hookName}`);
//   });
// });

// compiler.run();
import axios from "axios";
import "./index.css";
import "./index.less";
console.log("hello world");

axios.get("/api/info").then((res) => {
  console.log(res);
});
