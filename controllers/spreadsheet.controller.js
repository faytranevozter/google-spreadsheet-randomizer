const { successResponse, errorResponse } = require('../helpers/response')
const { GoogleSpreadsheet } = require('google-spreadsheet')

/**
 * @param {import('../index').AppContext} ctx
 */
const randomDataGet = async (ctx) => {
  try {
    const gSheetID = ctx.query.sheet_id

    if (!gSheetID) {
      return ctx.badRequest(
        errorResponse('sheet_id is required')
      )
    }

    const doc = new GoogleSpreadsheet(gSheetID, { apiKey: ctx.repo.googleApiKey })
    await doc.loadInfo()

    let sheet = null
    const sheetName = ctx.query.sheet_name
    if (sheetName) {
      sheet = doc.sheetsByTitle[sheetName]
    } else {
      sheet = doc.sheetsByIndex[0] // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    }

    if (!sheet) {
      return ctx.badRequest(
        errorResponse('sheet_name not found')
      )
    }

    const randomizeSheet = sheet.title

    const rows = await sheet.getRows()
    const totalData = rows.length

    const randomIndex = Math.floor((Math.random() * totalData))
    const randomData = rows[randomIndex]

    return ctx.ok(
      successResponse({
        document: {
          spreadsheet_id: doc.spreadsheetId,
          title: doc.title,
          sheet: randomizeSheet,
          total: totalData
        },
        random: {
          random_number: randomIndex + 1,
          ...randomData.toObject()
        }
      })
    )
  } catch (err) {
    console.error(err)
    return ctx.throw(err.error, err)
  }
}

module.exports = {
  randomDataGet
}
