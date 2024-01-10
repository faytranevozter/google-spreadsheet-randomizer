/**
 * @typedef {Object} ContextRepo
 * @property {ListRepo} repo
 *
 * @typedef {Object} ListRepo
 * @property {String} googleApiKey
 */

/**
 * @param {import('koa').BaseContext} appContext
 */
module.exports = async (appContext = {}) => {
  // google api key
  const gApiKey = process.env.GOOGLE_API_KEY ?? ''
  if (!gApiKey) {
    console.error('GOOGLE_API_KEY is required')
    process.exit(0)
  }

  appContext.repo = {
    googleApiKey: gApiKey
  }
}
