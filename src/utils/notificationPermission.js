import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const notificationPermissions = async () => {

    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    switch (result) {
        case RESULTS.UNAVAILABLE:
            console.log('This feature is not available on this device/context');
            break;
        case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
        case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
        case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
        case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
    }

}

export default notificationPermissions