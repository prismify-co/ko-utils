import { Visitor } from 'ast-types'

export default {
  visitExportDefaultDeclaration(path) {
    this.traverse(path)
  },
  visitExpressionStatement(path) {
    this.traverse(path)
  },
} as Visitor
