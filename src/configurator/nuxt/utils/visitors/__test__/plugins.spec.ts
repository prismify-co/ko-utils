import { oneLineTrim } from 'common-tags'

import plugins from '../plugins'

describe('nuxt/utils/visitors/plugins', () => {
  it('should add a plugin to the configuration file', () => {
    expect.assertions(1)
    const config = plugins.add('export default {}', 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        plugins: ["module"]
      };`)
  })

  it('should remove a plugin to the configuration file', () => {
    expect.assertions(1)
    let config = plugins.add('export default {}', 'module')
    config = plugins.remove(config, 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        plugins: []
      };`)
  })

  it('should add a plugin with client mode to the configuration file', () => {
    expect.assertions(1)
    const config = plugins.add('export default {}', 'module', 'client')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        plugins: [{plugin: 'module',mode: 'client'}]
      };`)
  })

  it('should remove a plugin with client mode to the configuration file', () => {
    expect.assertions(1)
    let config = plugins.add('export default {}', 'module')
    config = plugins.remove(config, 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        plugins: []
      };`)
  })
})
