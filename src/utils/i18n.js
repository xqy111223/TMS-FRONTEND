// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  var reg = /[\u4e00-\u9fa5]/g
  if (reg.test(title)) {
    return title
  } else {
    const hasKey = this.$te('route.' + title)
    if (hasKey) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      const translatedTitle = this.$t('route.' + title)

      return translatedTitle
    }
    return title
  }
}
