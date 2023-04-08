const ERROR_MESSAGE = {
    WALLET_EXIST: 'Wallet already exists',
    USER_NOT_FOUND:'User with this Email not Found',
    PASSWORD_INCORRECT:'Email or Password is Incorect',
    USER_ALREADY_EXIST:'User with this Email Already Exists',
}

const SUCCESS_MESSAGE = {
    ACCOUNT_CREATED: 'Account Created successfully',
     ACCOUNT_DELETED: 'Account DELETED successfully',
     BOOK_CREATED:'Book Created Successfully',
     BOOK_FETCH:'Books Data retrevied',
     BOOK_MOVE:'Books Data Moved to Reading'


}
const SUCCESS_STATUS = {
    TRUE: true,
    FALSE: false,
}

// HTTP STATUS CODES
const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOW: 405,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
}

module.exports = {
    ERROR_MESSAGE,
    HTTP_STATUS_CODE,
    SUCCESS_STATUS,
    SUCCESS_MESSAGE,
}
