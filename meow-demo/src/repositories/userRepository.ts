import { User } from "../models/userModel";


const testData = [
	{
        "id": 1,
		"name": "Dolan Wilkinson",
        "phoneNumber": '123-456-789'
	},
	{
        "id": 2,
		"name": "Carolyn Barnes",
        "phoneNumber": '123-456-456'
	},
	{
        "id": 3,
		"name": "Armando Peterson",
        "phoneNumber": '123-456-123'
	},
	{
        "id": 4,
		"name": "Mando Salinas",
        "phoneNumber": '123-456-234'
	},
	{
        "id": 5,
		"name": "MacKenzie Figueroa",
        "phoneNumber": '123-456-456'
	}
]

export interface UserRepository {
    getUser: (userId: number) => User | undefined
    getAllUsers: () => User[]
    // ... delete, upsert, patch, create
}

const userRepository = () => {
    const idLookupMapping = testData.reduce((builder,userData) => {
        builder[userData["id"]] = userData as User
        return builder
    }, {} as {[index:number]: User} )

    const getAllUsers = () => {
        return Object.values(idLookupMapping)
    }

    const getUser = (userId: number) => {
        return idLookupMapping[userId]
    }
    return {getAllUsers, getUser}
}

export default function newUserRepository(): UserRepository {
    return userRepository()
}