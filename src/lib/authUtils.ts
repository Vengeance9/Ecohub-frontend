export type UserRole = "USER" | "ADMIN" | "COMMON";
export type RouteOwner = "USER" | "ADMIN" | "COMMON" | null;

const authRoutes = ['/login','/register']

export const isAuthRoute = (pathname:string) => authRoutes.includes(pathname)

const userRoutes: RouteConfig = {
  exact: [],
  regExp: [/^\/users/],
}; 
const adminRoutes: RouteConfig = {
  exact: [],
  regExp: [/^\/admin/],
}; 
const commonRoutes: RouteConfig = {
  exact: ['/profile'],
  regExp: [],
}; 


export type RouteConfig={
  exact:string[],
  regExp:RegExp[]
}

const isRouteMatches = (pathname:string,routes:RouteConfig)=>{
    if(routes.exact.includes(pathname)) return true

    return routes.regExp.some((pattern: RegExp) => pattern.test(pathname));
}


export const routeOwner = (route:string):RouteOwner=>{
    if(isRouteMatches(route,userRoutes)) return "USER"
    if(isRouteMatches(route,adminRoutes)) return "ADMIN"
    if(isRouteMatches(route,commonRoutes)) return "COMMON"
    return null
}

export const isValidRoute = (route:string,role:UserRole)=>{

    const cleanedRoute = route.split('?')[0]
    const owner = routeOwner(cleanedRoute)
    
    if(owner === role || owner ===null || owner === "COMMON") return true
    return false
}

export const defaultRoutes = (role:UserRole)=>{
    if(role === "ADMIN") return '/admin/adminDashboard'
    else if(role === "USER") return '/users/memberDashboard'
    else return '/'
}

