import { api } from "@/src/configureApi"
import { type NextRequest } from 'next/server'

const userController = api.controllers.userController


export async function GET(request: NextRequest) {
	const queryParams = request.nextUrl.searchParams
	const nameFilter = queryParams.get("name") || undefined
   
    return Response.json(userController.search(nameFilter))
}