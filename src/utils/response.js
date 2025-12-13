/**
 * Standard success response
 */
export const successResponse = (
  res,
  { message = 'Success', data = null, pagination = null }
) => {
  return res.json({
    success: true,
    message,
    data,
    pagination,
  });
};

/**
 * Standard error response
 */
export const errorResponse = (
  res,
  { message = 'Error', statusCode = 500, errors = null }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
