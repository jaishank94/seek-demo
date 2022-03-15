import firestore from '@react-native-firebase/firestore';
import {
    GoogleSignin
  } from '@react-native-google-signin/google-signin';
  
export const getAuth = () => {

    return (dispatch, getState) => {

        dispatch({ type: 'LOAD_AUTH_START' })

        GoogleSignin.getCurrentUser().then(function (response) {
            console.log(response)
            let uInfo = {
                name: response.user.name
            }
            dispatch({ type: 'LOAD_AUTH_SUCCESS', payload: uInfo })

        }).catch(function (error) {
            dispatch({ type: 'LOAD_AUTH_FAILURE', payload: error })
        })
    }

}