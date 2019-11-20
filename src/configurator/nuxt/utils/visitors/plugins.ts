// tslint:disable-next-line: file-name-casing
import { builders, namedTypes as Types } from 'ast-types'

import { createObjectExpression, hasElement, hasProperty, parse, reinterpret } from '../ast'

import visitors from './common'

export default {
  add(config: string, name: string, mode: 'client' | 'server' = 'server') {
    return reinterpret(config, () => ({
      ...visitors,
      visitObjectExpression(path) {
        const properties = (path.node.properties as Types.Property[])
        const plugins = properties.find(hasProperty('plugins'))
        // Check if 'plugins' exists
        if (plugins) {
          const elements = (plugins.value as Types.ArrayExpression).elements
          // Check if any elements exists
          if (elements) {
            // Add module to the config
            if (!elements.find(hasElement(name) as any)) {
              elements.push(builders.literal(name))
            }

            // Set the elements
            (plugins.value as Types.ArrayExpression).elements = elements
          }
        } else {
          // Add module to the plugins property
          // and assign add it to the AST
          path.node.properties.push(
            builders.property(
              'init',
              builders.identifier('plugins'),
              builders.arrayExpression([
                mode === 'client' ? createObjectExpression(parse(`
                  export default { plugin: '${name}', mode: '${mode}' }
                `).program.body[0].declaration.properties)
                  : builders.stringLiteral(name)
              ])
            )
          )
        }
        return false
      }
    }))
  },
  remove(config: string, name: string) {
    return reinterpret(config, () => ({
      ...visitors,
      visitObjectExpression(path) {
        const properties = (path.node.properties as Types.Property[])
        const plugins = properties.find(hasProperty('plugins'))
        // Check if 'plugins' exists
        if (plugins) {
          const elements = (plugins.value as Types.ArrayExpression).elements
          // Check if any elements exists
          if (elements) {
            const index = elements.findIndex(hasElement(name) as any)

            // Remove module if it exists
            if (index > -1) {
              elements.splice(index, 1)
            }

            // Set the elements
            (plugins.value as Types.ArrayExpression).elements = elements
          }
        }
        return false
      }
    }))
  }
}
