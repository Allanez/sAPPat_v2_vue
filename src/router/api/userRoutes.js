import axios from 'axios';
const URL = import.meta.env.VITE_URL
// const BASE_URL = process.env.VITE_BASE_URL

const login = async (payload) => {
    console.log(URL)
    try{
      let response = await axios.post(URL + "login?email=" + payload.username + "&password=" + payload.password);
      return response.data
    }
    catch (err){
      return err.response.data;
    }
}

export{
    login,

}