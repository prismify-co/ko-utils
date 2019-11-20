import { builders, namedTypes as Types } from 'ast-types'

import { createObjectExpression, hasElement, hasProperty, parse, reinterpret } from '../ast'

import visitors from './common'

export default {
  add(config: string, name: string, options?: string) {
    return reinterpret(config, () => ({
      ...visitors,
      visitObjectExpression(path) {
        const properties = (path.node.properties as Types.Property[])
        const buildModules = properties.find(hasProperty('buildModules'))
        // Check if 'buildModules' exists
        if (buildModules) {
          const elements = (buildModules.value as Types.ArrayExpression).elements
          // Check if any elements exists
          if (elements) {
            // Add module to the config
            if (!elements.find(hasElement(name) as any)) {
              elements.push(builders.literal(name))
            }

            // Set the elements
            (buildModules.value as Types.ArrayExpression).elements = elements
          }
        } else {
          // Add module to the buildModules property
          // and assign add it to the AST
          path.node.properties.push(
            builders.property(
              'init',
              builders.identifier('buildModules'),
              builders.arrayExpression([
                options ? builders.arrayExpression([
                  builders.stringLiteral(name),
                  createObjectExpression(parse('export default' + options).program.body[0].declaration.properties)
                ]) : builders.stringLiteral(name)
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
        const buildModules = properties.find(hasProperty('buildModules'))
        // Check if 'buildModules' exists
        if (buildModules) {
          const elements = (buildModules.value as Types.ArrayExpression).elements
          // Check if any elements exists
          if (elements) {
            const index = elements.findIndex(hasElement(name) as any)

            // Remove module if it exists
            if (index > -1) {
              elements.splice(index, 1)
            }

            // Set the elements
            (buildModules.value as Types.ArrayExpression).elements = elements
          }
        }
        return false
      }
    }))
  }
}
