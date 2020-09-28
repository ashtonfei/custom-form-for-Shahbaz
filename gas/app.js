const getAppData = () => {
    const appData = {
        assets: ASSETS,
        app: {
            name: APP_NAME,
            description: APP_DESCRIPTION,
        },
    }
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
