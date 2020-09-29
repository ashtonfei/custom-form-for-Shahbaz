// consts
const SPREADSHEET_ID = "183JylbkMxNpPqii21ljh3VPlDl-By2T6wTv4p8CGRTM" // the google spreadsheet id as the database for the app
const APP_NAME = "Form with Login and MDD" // the name of your application
const APP_DESCRIPTION = `<div>This is a form built with 
    <a class="black-text" target="_blank" href="https://developers.google.com/apps-script/">Google Apps Script<\/a> & 
    <a class="black-text" target="_blank" href="https://vuematerial.io/">VUE Material<\/a>.<\/div>` // HTML content supported
const APP_DESCRIPTION_STRANGER = `<div>You need to sign in to use this form. Or you can make make a copy of the  
    <a class="black-text" target="_blank" href="https://script.google.com/d/1FKXPUXoZZgLDtoE2DPV8_BeKW7-hLdYFgQ9gdn2kl1eu3tWihJSaB78T/edit?usp=sharing">Script<\/a> & the 
    <a class="black-text" target="_blank" href="https://docs.google.com/spreadsheets/d/183JylbkMxNpPqii21ljh3VPlDl-By2T6wTv4p8CGRTM/copy">Spreadsheet<\/a> to start your own form.<\/div>` // HTML content supported
const APP_CONFIRMATION = `<strong class="blue-text">Thanks for you submission.<\/strong>` // HTML content supported


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

// database sheet
const DB_USERS = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Users")
const KEYS_USERS = [
    "email",
    "password",
    "fullname",
]


// form reseponse sheet
const DB_RESPONSES = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Responses")
const KEYS_RESPONSES = [
    "compnay",
    "region",
    "contry",
    "department",
    "fullname",
    "email",
]

const DB_RELATIONS = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Relations")
function getRelations(){
    const relations = []
    const values = DB_RELATIONS.getDataRange().getValues()
    const header = values.shift()
    header.forEach( (header, index) => {
        relations.push({
            label: header,
            icon: "filter_alt",
            value: "",
            required: true,
            options: [],
            kids: {},
        })
    })
    values.forEach((value) => {
        value.forEach((cell, index) =>{
            if (relations[index].options.indexOf(cell) === -1) relations[index].options.push(cell)
            if (index < value.length - 1) {
                const kid = value[index + 1]
                const kidKey = `${index}_kid_${cell}`
                if (relations[index].kids[kidKey]) {
                    if (relations[index].kids[kidKey].indexOf(kid) === -1) relations[index].kids[kidKey].push(kid)
                }else{
                    relations[index].kids[kidKey] = [kid]
                }
            }
        })
    })
    return relations
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

function validateToken(token) {
    return CacheService.getScriptCache().get(token)
}


function destroyToken(token){
    CacheService.getScriptCache().remove(token)
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

