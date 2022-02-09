// Extends JS Default Error while creating custon API Error msg using StatusCodes.
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
