import main from './main'
import utils from './utils'
import { colors, fonts } from './thememap'

export default {
  parse: main,
  findIndex: utils.findIndex,
  findRange: utils.findRange,
  colorsMap: colors,
  fontsMap: fonts
}
