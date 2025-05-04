import {asyncHandler} from "../utils/async-handler"
import { ApiResponse } from "../utils/api-response"

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role} = req.body;

    if(!email || !password){

    }

    if(password.length < 8){

    }
})

export {registerUser};