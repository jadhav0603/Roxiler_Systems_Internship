import axios from "axios";

const token = localStorage.getItem('token')

export const storeData = async () => {
    try {
        const response = await axios.get(
            "http://localhost:3000/store/getStore",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data);
        const data = response.data
        return data
    } catch (error) {
        console.log(error.message);
    }


}