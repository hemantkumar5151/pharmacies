
import axios from 'axios';
import { showAlert } from './alert';
export const updateSettings = async(data , type) => {
  const url = type === 'password' ? 
    '/api/v1/users/updateMyPassword' :
    '/api/v1/users/updateMe'
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data
    })
    if(res.data.status === 'success') {
      showAlert('success', 'Data updated successfully');
    }
  } catch (error) {
     showAlert('error',error.response.data.message)
  }

}
export const passwordUpdate = async (passwordCurrent,password,passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent, 
        password,
        passwordConfirm
      }
    })
    if(res.data.status === 'success') {
      showAlert('success','Password updated')
    }
  } catch (error) {
    showAlert('error',error.response.data.message)
  }
}
