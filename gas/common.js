// consts
const SPREADSHEET_ID = "183JylbkMxNpPqii21ljh3VPlDl-By2T6wTv4p8CGRTM" // the google spreadsheet id as the database for the app
const APP_NAME = "CUSTOM FORM FOR SHAHBAZ" // the name of your application

// database sheet
const DB_USERS = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Users")
const KEYS_USERS = [
    "email",
    "password",
    "fullname",
]


// labels and icons
const ASSETS = {
    email: {
        label: "Email",
        icon: "email",
    },
    password: {
        label: "Password",
        icon: "lock_open",
    },
    fullname: {
        label: "Full name",
        icon: "person",
    }
}

/**
 * get user by email address
 */
function getUserByEmail(email){
    email = email.toString().trim().toLowerCase()
    const emailIndex = KEYS_USERS.indexOf("email")
    const values = DB_USERS.getDataRange().getValues()
    values.shift()
    const users = values.filter( (value, i) => {
       const userEmail = value[emailIndex].toString().trim().toLowerCase()
       return email === userEmail
    })
    if (users.length === 0) return null
    const user = {}
    KEYS_USERS.forEach((key, index) => {
        switch (key) {
            case "email":
                user[key] = users[0][index].toString().trim().toLowerCase()
                break
            default:
                user[key] = users[0][index].toString().trim()
        }
    })
    return user
}

function createToken(email) {
    const token = Utilities.base64EncodeWebSafe(Utilities.getUuid() + email + APP_NAME)
    const key = token
    const value = email
    const expirationInSeconds = 6 * 60 * 60
    CacheService.getScriptCache().put(key, value, expirationInSeconds)
    return token
}

/**
 * include html file with scriptlet
 */
function include(filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent()
}

/**
 * doget function for google apps script web app
 */
function doGet(e) {
    const htmlOutput = HtmlService.createTemplateFromFile("html/index.html").evaluate()
    htmlOutput
        .setTitle(APP_NAME)
        .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    return htmlOutput
}

