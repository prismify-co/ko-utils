export default interface NuxtConfigurator {
  addCSS(css: string): this
  removeCSS(css: string): this
  addBuildModule(module: string, options?: string): this
  removeBuildModule(module: string): this
  addPlugin(plugin: string, mode?: 'client' | 'server'): this
  removePlugin(plugin: string): this
  configure(): string
}
