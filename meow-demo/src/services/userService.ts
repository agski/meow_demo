import { User } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";

export interface UserSearchResult {
    name: string;
    id: number;
}

export interface UserService {
    getUser: (userId: number) => User | undefined
    searchUsers: (name?: string) => UserSearchResult[]
}

const userService = (userRepository: UserRepository) => {

    const getUser = (userId: number): User | undefined => {
        return userRepository.getUser(userId)
    }

    // basic substring match, implementation could be iterated to use
    // more robust index like elasticsearch or vector search
    const searchUsers = (name?:string): UserSearchResult[] => {
        const allUsers = userRepository.getAllUsers()

        const normalizedQuery = name ? name.toLowerCase() : undefined

        return allUsers.reduce((builder, user) => {
            if (normalizedQuery !== undefined) {
                const normalizedUserName = user.name.toLowerCase()
                if (normalizedUserName.includes(normalizedQuery)) {
                    builder.push({name: user.name, id: user.id})
                }
            }
            else {
                builder.push({name: user.name, id: user.id})
            }
            
            return builder
        }, [] as UserSearchResult[])
    }

    return {getUser, searchUsers}
}

export default function newUserService(UserRepository: UserRepository): UserService {
    return userService(UserRepository)
}