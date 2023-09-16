/**
 * Prefix non-default language urls
 * @param {*} doc
 */
export default function (doc) {
  switch (doc.type) {
    case ('page'):
      return `/${doc.uid}`
    case ('work_page'):
      return `/series/${doc.uid}`
    case ('page_misc'):
      return `/page/${doc.uid}`
    case ('work'):
      return `/work/${doc.uid}`
    case ('home'):
    default:
      return '/'
  }
}
