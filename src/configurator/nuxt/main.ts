import NuxtConfigurator from './interfaces/nuxt-configurator'
import buildModules from './utils/visitors/build-modules'
import _css from './utils/visitors/css'
import plugins from './utils/visitors/plugins'

/**
 * @param {String} config The nuxt configuration file
 */
// tslint:disable-next-line: new-parens
export default (config: string): NuxtConfigurator => (new class implements NuxtConfigurator {
  constructor(private config = '') { }
  addCSS(css: string) {
    this.config = _css.add(this.config, css)
    return this
  }

  removeCSS(css: string) {
    this.config = _css.remove(this.config, css)
    return this
  }

  addBuildModule(module: string, options?: string) {
    this.config = buildModules.add(this.config, module, options)
    return this
  }

  removeBuildModule(module: string) {
    this.config = buildModules.remove(this.config, module)
    return this
  }

  addPlugin(plugin: string, mode: 'client' | 'server' = 'server') {
    this.config = plugins.add(this.config, plugin, mode)
    return this
  }

  removePlugin(plugin: string) {
    this.config = plugins.remove(this.config, plugin)
    return this
  }

  configure(): string {
    return this.config
  }
}(config))
