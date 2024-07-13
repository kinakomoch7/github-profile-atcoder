import { CIRCLE_COLOR_THEME } from "../../constants/constants"

const determineColor = (score:number) => {

  if (score < 400) {
    return CIRCLE_COLOR_THEME[0]
  } else if (score < 800) {
    return CIRCLE_COLOR_THEME[1]
  } else if (score < 1200) {
    return CIRCLE_COLOR_THEME[2]
  } else if (score < 1600) {
    return CIRCLE_COLOR_THEME[3]
  } else if (score < 2000) {
    return CIRCLE_COLOR_THEME[4]
  } else if (score < 2400) {
    return CIRCLE_COLOR_THEME[5]
  } else if (score < 2800) {
    return CIRCLE_COLOR_THEME[6]
  } else {
    return CIRCLE_COLOR_THEME[7]
  }

}

export default determineColor