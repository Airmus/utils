/*
 * @Date: 2021-09-02 23:29:23
 * @LastEditTime: 2021-09-02 23:53:33
 * @Description: 检测DOM曝光
 */

type Options = {
  /** 曝光阈值，达到百分之多少时才触发 */
  threshold?: number
  /** 最多执行多少次callback后开始忽略 */
  maxCount?: number | 'infinite'
}

const DomExposure = (selector: string, callback: () => void, options?: Options) => {
  const { threshold = 1, maxCount = 'infinite' } = options || {}
  const targetDoms = document.querySelectorAll(selector) || []
  const domLists = Array.from(targetDoms)
  if (
    !('IntersectionObserver' in window) ||
    !('IntersectionObserverEntry' in window) ||
    !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
  ) {
    // load polyfill now
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          if (item.intersectionRatio >= threshold) {
            callback()
            io.unobserve(item.target)
          }
        })
      },
      {
        root: null,
        threshold,
      },
    )
    // observe遍历监听所有box节点
    domLists.forEach((box) => io.observe(box))
  }
}

export default DomExposure
