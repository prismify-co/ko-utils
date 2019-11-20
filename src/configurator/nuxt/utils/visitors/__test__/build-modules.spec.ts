import { oneLineTrim } from 'common-tags'

import buildModules from '../build-modules'

describe('nuxt/utils/visitors/build-modules', () => {
  it('should add a build module to the configuration file', () => {
    expect.assertions(1)
    const config = buildModules.add('export default {}', 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        buildModules: ["module"]
      };`)
  })

  it('should remove a build module to the configuration file', () => {
    expect.assertions(1)
    let config = buildModules.add('export default {}', 'module')
    config = buildModules.remove(config, 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        buildModules: []
      };`)
  })

  it('should add a build module with options to the configuration file', () => {
    expect.assertions(1)
    const config = buildModules.add('export default {}', 'module', '{ key: "value" }')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        buildModules: [["module", {key: "value"}]]
      };`)
  })

  it('should remove a build module with options to the configuration file', () => {
    expect.assertions(1)
    let config = buildModules.add('export default {}', 'module')
    config = buildModules.remove(config, 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        buildModules: []
      };`)
  })
})
