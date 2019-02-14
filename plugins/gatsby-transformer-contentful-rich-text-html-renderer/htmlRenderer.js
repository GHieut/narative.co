const { BLOCKS } = require('@contentful/rich-text-types')
// Options used in the documentToHtmlString renderer

module.exports.HTMLRendererOpts = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      if (!node.data.target.fields) return null

      let { align, image, text, id } = node.data.target.fields
      const contentfulId = node.data.target.sys.contentType.sys.id

      if (id && id.en && contentfulId === 'embed') {
        return `
          <twitter twitterId="${id.en}"></twitter>
        `
      }

      if (text && text.en && contentfulId === 'pullQuote') {
        return `
          <blockquote class="pull__quote">${text.en}</blockquote>
        `
      }

      if (image && image.en && contentfulId === 'articleImage') {
        let { file, title, description } = image.en.fields
        // Sometimes the file and filename exist outside of a locale (I don't know why! Previews are an example)
        // So here we just reprogram file to either be _just_ file or the en locale version of file
        file = file.en || file
        // Same goes for the other values
        title = title.en || title
        description = (description && (description.en || description)) || null

        // Alt is either the title or the filename (if title is missing). Assumes en (wrong)
        const alt = title || file.fileName
        const src = file.url
        const className = align.en.toLowerCase()

        // Caption is the description.
        const caption = description

        // Make the img tag that will be returned either way
        const img = `<img src="${src}" alt="${alt}" class="image__${className}" />`

        // If there is a description, then we want to render that as a <caption>
        if (caption) {
          return `
          <figure>
            ${img}
            <figcaption>${caption}</figcaption>
          </figure>
        `
        } else {
          return img
        }
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      // todo : handle other assets
      // todo : lazy load these images

      if (!node.data.target.fields) return null
      let { file, title, description } = node.data.target.fields

      // Sometimes the file and filename exist outside of a locale (I don't know why! Previews are an example)
      // So here we just reprogram file to either be _just_ file or the en locale version of file
      file = file.en || file
      // Same goes for the other values
      title = title.en || title
      description = (description && (description.en || description)) || null

      // Alt is either the title or the filename (if title is missing). Assumes en (wrong)
      const alt = title || file.fileName
      const src = file.url

      // Caption is the description.
      const caption = description

      // Make the img tag that will be returned either way
      const img = `<img src="${src}" alt="${alt}" />`

      // If there is a description, then we want to render that as a <caption>
      if (caption) {
        return `
          <figure>
            ${img}
            <figcaption>${caption}</figcaption>
          </figure>
        `
      } else {
        return img
      }
    },
  },
}
