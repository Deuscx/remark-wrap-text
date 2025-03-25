import fs from 'node:fs/promises'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import remarkGemoji from './plugin'

async function run() {
  const document = await fs.readFile('input.md', 'utf8')

  const processor = unified()
    .use(remarkParse)
    .use(remarkGemoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)

  //   const mdastTree = processor.parse(document)
  //   const mdast = processor.runSync(mdastTree)
  const file = await processor.process(document)

  return file
}

run()
