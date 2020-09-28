const getAppData = () => {
    const appData = {
        assets: ASSETS,
        app: {
            name: APP_NAME,
        },
    }
    return JSON.stringify(appData)
}

const signIn = ({email, password}) =>{
    const user = getUserByEmail(email)
    if (!user) return JSON.stringify({user: null})
    if (user.password !== password) return JSON.stringify({user: null})
    const token = createToken(email)
    user.token = token
    return JSON.stringify(user)
}
