import { oneLineTrim } from 'common-tags'

import css from '../css'

describe('nuxt/utils/visitors/css', () => {
  it('should add a css module to the configuration file', () => {
    expect.assertions(1)
    const config = css.add('export default {}', 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        css: ["module"]
      };`)
  })

  it('should remove a css module to the configuration file', () => {
    expect.assertions(1)
    let config = css.add('export default {}', 'module')
    config = css.remove(config, 'module')
    expect(oneLineTrim`${config}`).toEqual(
      oneLineTrim`export default {
        css: []
      };`)
  })
})
