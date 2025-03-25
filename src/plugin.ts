import type { Parent, Root, RootContent, Text } from 'mdast'
import type { Position } from 'unist'
import { visit } from 'unist-util-visit'

function plugin() {
  return transform
}

let rootPosition: Position
function transform(tree: Root) {
  if (!tree?.position)
    return
  rootPosition = tree.position
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  visit(
    tree,
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    node => node.type === 'text' && node.value.trim(),
    wrapText,
  )
}

const maxWordWrapCount = 8

function wrapText(node: RootContent, index: number, parent: Parent) {
  const isEndLine = rootPosition.end.line <= parent.position!.end.line + 1
  if (!isEndLine)
    return

  // 将所有文本节点split后用span标签包裹
  const text = (node as Text).value
  const split = text.split('') as string[]
  const totalLength = split.length
  const spans = split.map((item, index) => {
    return {
      type: 'element',
      data: {
        hName: 'span',
        hProperties: {
          ...node.data?.hProperties,
          className: totalLength - index <= maxWordWrapCount ? 'end' : 'test',
        },
      },
      children: [
        {
          type: 'text',
          value: item,
        },
      ],
    }
  })
  parent.children.splice(index, 1, ...(spans as any[]))

  // prevent infinite loop  https://github.com/orgs/remarkjs/discussions/1201#discussioncomment-6667114
  return index + spans.length
}

export default plugin
