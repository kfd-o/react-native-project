// MainNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import AdminNavigator from './admin/stack/AdminNavigator';
import AuthNavigator from './authentication/stack/AuthNavigator';
import VisitorNavigator from './visitor/stack/VisitorNavigator';
import SecurityPersonnelNavigator from './security_personnel/stack/SecurityPersonnelNavigator';
import HomeownerNavigator from './homeowner/stack/HomeownerNavigator';

const MainNavigator = () => {
    const [userState, setUserState] = React.useState([]);

    const getToken = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserState(decodedToken.route);
        } else {
            setUserState(null);
        }
    };

    const renderNavigator = () => {
        switch (userState) {
            case 0:
                return <AdminNavigator />
            case 1:
                return <HomeownerNavigator />
            case 2:
                return <SecurityPersonnelNavigator />
            case 3:
                return <VisitorNavigator />
            default:
                return <AuthNavigator />
        }
    }

    React.useEffect(() => {
        getToken();
    }, []);

    return (
        <NavigationContainer>
            {renderNavigator()}
        </NavigationContainer>
    );
};

export default MainNavigator;


