import { api } from "@/src/configureApi"
import { type NextRequest } from 'next/server'

const userController = api.controllers.userController

export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    return Response.json(userController.get(params.id))
}