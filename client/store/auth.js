import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const UPDATE_USER = 'UPDATE_USER';
/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const updateUser = user => ({type : UPDATE_USER,user})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}



















export const updateUserThunk = (user) => async dispatch => {
  try{
    console.log(user)
    const { data: updated } = await axios.put(`/api/users/userprofile/${user.id}`, user)
    history.push(`/userprofile/${user.id}`)
    return dispatch(updateUser(updated))

  }catch(err){
    console.log(err)
  }
}


export const authenticate = (username, password, method, email, address) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, email, address})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case UPDATE_USER:
      return action.user;
    default:
      return state
  }
}
