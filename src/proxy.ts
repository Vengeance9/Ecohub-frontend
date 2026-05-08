import { NextRequest, NextResponse } from "next/server";
import { defaultRoutes, isValidRoute, UserRole } from "./lib/authUtils";

export async function proxy(req:NextRequest){
        const pathname = req.nextUrl.pathname
        const accessToken = req.cookies.get('accessToken')?.value
        const role = req.cookies.get('role')?.value

        //console.log('THIS IS THE PATHNAME in middleware',pathname)
        //console.log('THIS IS THE ACCESS TOKEN in middleware',accessToken)
        //console.log('THIS IS THE ROLE in middleware',role)

        if(accessToken && role){
            if(!isValidRoute(pathname,role as UserRole)){
                return NextResponse.redirect(new URL(defaultRoutes(role as UserRole),req.url))
            }
        }
        return NextResponse.next()
}
