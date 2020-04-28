module.exports = (error, response) => {
  const errorMessage = error.message || `Internal server error: ${error}`;
  console.error(errorMessage); // todo: move to logger?

  if (response) {
    response.status(500).json({
      message: errorMessage,
    });
  }
};
