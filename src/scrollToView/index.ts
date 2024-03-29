/*
 * @Date: 2021-06-07 09:52:28
 * @LastEditTime: 2021-09-02 23:30:57
 * @Description: 滚动到可视区域
 */

export type Options = ScrollToOptions & {
  /** 横向滚动位置偏移量，正数偏右，负数偏左 */
  offsetX?: number
  /** 纵向滚动位置偏移量，正数偏上，负数偏下 */
  offsetY?: number
  /** css选择器，用于指定滚动的dom */
  selector?: string
}

/** 滚动至可视区域 */
function scrollToView(options: Options) {
  const { top, left, offsetY = 0, offsetX = 0, selector, behavior } = options ?? {}
  let elmSelector = selector
  if (!elmSelector) {
    // 如果未指定选择器，就从路由里面读取锚点
    const matchs = window.location.hash.match(/(#\S+)/g)
    if (matchs) {
      elmSelector = matchs[matchs.length - 1]
    }
  }
  if (elmSelector) {
    const dom = document.querySelector(elmSelector)
    if (dom) {
      window.scrollTo({
        behavior,
        top: top ?? dom.getBoundingClientRect().top + offsetY,
        left: left ?? dom.getBoundingClientRect().left + offsetX,
      })
    }
  }
  else {
    throw new Error('Did you forget params selector?')
  }
}

export default scrollToView
