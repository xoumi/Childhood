import Vue from 'vue'
const requireComponent = require.context(
  '.',
  false,
  /[A-Za-z0-9-_]+\.vue$/
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})