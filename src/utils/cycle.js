import AuthNavigator from "../navigator/authentication/stack/AuthNavigator";
import VisitorNavigator from "../navigator/visitor/stack/VisitorNavigator";
import AdminNavigator from "../navigator/admin/stack/AdminNavigator";
import SecurityPersonnelNavigator from "../navigator/security_personnel/stack/SecurityPersonnelNavigator";
import HomeownerNavigator from "../navigator/homeowner/stack/HomeownerNavigator";

export const AuthNavigation = () => {
    return <AuthNavigator />
}

export const VisitorNavigation = () => {
    return <VisitorNavigator />
}

export const AdminNavigation = () => {
    return <AdminNavigator />
}

export const SecurityPersonnelNavigation = () => {
    return <SecurityPersonnelNavigator />
}

export const HomeownerNavigation = () => {
    return <HomeownerNavigator />
}