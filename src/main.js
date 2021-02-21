import getYoutubeId from 'get-youtube-id'
import marked from 'marked'
import fm from 'front-matter'
import emoji from 'node-emoji'
import { colors, fonts } from './thememap'
import md5 from 'md5'

export default ostr => {
  const project = {}
  const scenes = []

  const front = fm(emoji.emojify(ostr))
  const attr = front.attributes
  var str = front.body

  str = str.replace(/\r\n?/g, '\n')

  for (const k in attr) {
    project[k] = attr[k]
  }

  project._integrity = md5(JSON.stringify(attr))

  if (project.colors) project.colors = colors[project.colors]
  if (project.fonts) project.fonts = fonts[project.fonts]

  const arr = str.split('\n\n')

  arr.forEach(t => {
    const comps = t.split('||')
    const text = comps[0]
    const cVars = comps.length > 1 ? comps[1].trim().split(',') : ''

    let block = {
      type: 'text',
      text: marked(`# ${text}`),
      textVar: 'title',
      scale: 4
    }

    if (cVars) {
      cVars.forEach(v => {
        const vr = v.split(':')
        block[vr[0]] = vr[1]
      })
    }

    const isImg = text.match(/(\.jpg|\.gif|\.png|\.jpeg|\.webp)/gi)
    if (isImg) {
      block = {
        type: 'image',
        url: text
      }
    }

    const isVid = text.match(/(\.m4v|\.mov|\.mp4|\.webm)/gi)
    if (isVid) {
      block = {
        type: 'video',
        url: text
      }
    }

    const isHtml = text.match(/(\.htm|\.html)/gi)
    if (isHtml) {
      block = {
        type: 'embed',
        url: text
      }
    }

    const isYT = getYoutubeId(text)
    if (isYT) {
      block = {
        type: 'youtube',
        url: isYT
      }
    }

    scenes.push({
      blocks: [block]
    })
  })

  project.scenes = scenes

  return project
}
