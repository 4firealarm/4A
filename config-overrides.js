const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // 主题自定义变量
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@text-color': '#303659'},
  }),
);