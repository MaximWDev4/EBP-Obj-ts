import { systemActionType, SET_TOKEN, CLEAR_TOKEN} from "../types"

export function setToken(newToken: string) : systemActionType {
    return {
        type: SET_TOKEN,
        payload: newToken,
    }
}

export function clearToken() : systemActionType {
    return {
        type: CLEAR_TOKEN,
        payload: ''
    }
}
