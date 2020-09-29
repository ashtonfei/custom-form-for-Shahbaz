const getAppData = (token) => {
    const relations = getRelations()
    const form = [
        {
            type: "text",
            label: "Full name",
            icon: "person",
            required: true,
            value: "",
        },
        {
            type: "email",
            label: "Email",
            icon: "email",
            required: true,
            value: "",
        },
        {
            type: "date",
            label: "Date",
            icon: "event",
            required: true,
            value: null,
        },
        {
            type: "single",
            label: "Gender",
            icon: "people",
            required: true,
            value: null,
            options: ["Male", "Female", "Other"],
        },
        {
            type: "multiple",
            label: "Languages",
            icon: "language",
            required: true,
            value: [],
            options: ["Chinese", "English", "Spanish", "Frech", "Japanese", "Catonese"],
        },
    ]
    const appData = {
        assets: ASSETS,
        app: {
            name: APP_NAME,
            description: APP_DESCRIPTION,
            descriptionStranger: APP_DESCRIPTION_STRANGER,
            confirmation: APP_CONFIRMATION,
        },
        form,
        relations,
        user: null,
    }
    if (!token) return JSON.stringify(appData)
    const email = validateToken(token)
    if (!email) return JSON.stringify(appData)
    appData.user = getUserByEmail(email)
    appData.user.token = token
    return JSON.stringify(appData)
}

const signIn = ({email, password}) =>{
    const user = getUserByEmail(email)
    if (!user) return JSON.stringify(null)
    if (user.password !== password) return JSON.stringify(null)
    const token = createToken(email)
    user.token = token
    return JSON.stringify(user)
}


const signOut = (user) => {
    user = JSON.parse(user)
    destroyToken(user.token)
    user = null
    return JSON.stringify(user)
}


const submitForm = (data) => {
    let {values, headers} = JSON.parse(data)
    values = [...values, new Date(), Utilities.getUuid()]
    headers = [...headers, "Timestamp", "UUID"]
    DB_RESPONSES.getRange(1,1,1,headers.length).setValues([headers])
    DB_RESPONSES.appendRow(values)
}
