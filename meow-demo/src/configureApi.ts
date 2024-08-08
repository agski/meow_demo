import newUserController, { UserController } from "./controllers/userController"
import newUserRepository, { UserRepository } from "./repositories/userRepository"
import newUserService, { UserService } from "./services/userService"

interface Controllers {
    userController: UserController
}   

interface Services {
    userService: UserService
}

interface Repositories {
    userRepository: UserRepository
}

interface API {
    controllers: Controllers, 
    services: Services, 
    repositories: Repositories
}


const configureApi = (): API => {
	const userRepository = newUserRepository()
	const userService = newUserService(userRepository)
	const userController = newUserController(userService)

    return {
        controllers: {
            userController
        },
        services: {
            userService
        },
        repositories: {
            userRepository
        }
    }
}

export const api = configureApi()