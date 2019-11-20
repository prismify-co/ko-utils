// tslint:disable-next-line: file-name-casing
import { namedTypes as Types, Visitor } from 'ast-types'
import * as recast from 'recast'

const builders = recast.types.builders
export function hasProperty(key: string) {
  return function (property: Types.Property) {
    if (property.key.type === 'Identifier') {
      return property.key.name === key
    }

    if (property.key.type === 'Literal') {
      return property.key.value === key
    }
    return false
  }
}

export function hasElement(key: string) {
  const includes = (literal: Types.Literal) => typeof literal.value === 'string' && literal.value.includes(key)
  return function (element: Types.Literal & Types.ArrayExpression) {
    // Determine if element is an ArrayExpression
    if (Array.isArray(element.elements)) {
      const literal = element.elements[0] as Types.Literal
      return includes(literal)
    }
    // Otherwise, it must be a Literal
    return includes(element)
  }
}

export function createObjectExpression(properties: Types.Property[]) {
  return builders.objectExpression(properties)
}

export function createProperty(key: string, value: any) {
  return builders.property('init',
    builders.identifier(key),
    value
  )
}

export function parse(source = '') {
  return recast.parse(source, {
    parser: require('acorn')
  })
}

export function reinterpret(config: string, visitor: () => Visitor) {
  let ast = parse(config)
  recast.visit(ast, visitor())

  return recast.print(ast, { useTabs: false, tabWidth: 2 }).code
}
