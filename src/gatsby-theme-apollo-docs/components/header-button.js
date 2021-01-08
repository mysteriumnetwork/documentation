// global docsearch
export default () => {
  if(typeof window !== 'undefined' && typeof window.docsearch !== 'undefined') {
    let docSearch = window.docsearch
    window.docsearch = (options) => {
      options.appId = 'LOISNC3H67'
      return docSearch(options)
    }
  }

  return null
};
