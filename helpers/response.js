const successResponse = (data, message = 'success') => {
  const response = {
    success: true,
    message,
    validation: {},
    data
  }

  return response
}

const errorResponse = (message, validationErrors = {}) => {
  const response = {
    success: false,
    message,
    validation: validationErrors,
    data: {}
  }

  return response
}

const errorValidation = (validationErrors = {}, message = 'failed') => {
  return errorResponse(message, validationErrors)
}

module.exports = {
  errorResponse,
  successResponse,
  errorValidation
}
