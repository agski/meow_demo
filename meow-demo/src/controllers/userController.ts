
import { ApiResponse } from "../models/ApiResponseModel"
import {  UserService } from "../services/userService"

export interface UserController {
    get: (id: number) => ApiResponse
    search: (query?: string) => ApiResponse
}

// telemetry events around status codes can be handled in this fn
const buildApiResponse = ( data: any = {}, status_code = 200, status_message = "OK"): ApiResponse => {
    return {
        status_code,
        status_message,
        data
    } as ApiResponse
}

const userController = (userService: UserService): UserController => {
    
    const get = (id:number): ApiResponse => {
        const user = userService.getUser(id)
        if (user == undefined) {
            return buildApiResponse({}, 400, "USER_NOT_FOUND")
        }
        return buildApiResponse(user)
    }

    const search = (query?: string): ApiResponse => {
        const searchResults = userService.searchUsers(query)
        return buildApiResponse(searchResults)
    }


    return {get, search}
}

// factory allows switching out useService for mock during unit testing
export default function newUserController(userService: UserService): UserController {
    return userController(userService)
}