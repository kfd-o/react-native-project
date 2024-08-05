import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useCameraPermission, useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons'

const QRCodeScannerScreen = ({ navigation }) => {
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();
    const [hasScanned, setHasScanned] = useState(false);
    const [flashEnabled, setFlashEnabled] = useState(false);
    const { width, height } = Dimensions.get('window');
    console.log(hasPermission)
    const middleBox = {
        x: width * 0.25,
        y: height * 0.25,
        width: width * 0.5,
        height: height * 0.5
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (!hasScanned && codes.length > 0) {
                const { frame } = codes[0];
                if (
                    frame.x >= middleBox.x &&
                    frame.y >= middleBox.y &&
                    frame.x + frame.width <= middleBox.x + middleBox.width &&
                    frame.y + frame.height <= middleBox.y + middleBox.height
                ) {
                    console.log(codes[0].value);
                    setHasScanned(true); // Set to true after scanning
                    // Handle the scanned code here
                }
            }
        }
    });

    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <View style={styles.container}>
            {device && hasPermission && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={!hasScanned} // Deactivate the camera after scanning
                    codeScanner={codeScanner}
                    torch={flashEnabled ? 'on' : 'off'} // Fix the torch property
                />
            )}
            <View style={styles.overlay}>
                <View style={styles.topOverlay} />
                <View style={styles.middleOverlay}>
                    <View style={styles.sideOverlay} />
                    <View style={styles.frame} />
                    <View style={styles.sideOverlay} />
                </View>
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity onPress={() => setFlashEnabled(!flashEnabled)} style={styles.button}>
                        <Icon name={`${flashEnabled ? 'flashlight-on' : 'flashlight-off'}`} size={30} color='#000' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                        <Icon name='fullscreen-exit' size={30} color='#000' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between'
    },
    topOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    middleOverlay: {
        flexDirection: 'row',
    },
    sideOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    frame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#FFF',
        backgroundColor: 'transparent',
    },
    bottomOverlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default QRCodeScannerScreen;
