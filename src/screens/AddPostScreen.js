import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Platform
} from 'react-native';

import { InputWrapper, InputField, ImageField } from '../styles/AddPostStyle';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

const AddPostScreen = ({ navigation }) => {

    const [image, setImage] = useState('');

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            setImage(imageUri)
        });
    }

    const choosePhoto = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            setImage(imageUri)
        });
    }
    return (
        <View style={styles.container}>
            <InputWrapper>
                {image ? <ImageField source={{ uri: image }} /> : null}
                <InputField
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                />
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item
                    buttonColor='#9b59b6'
                    title="Take Photo"
                    onPress={() => takePhoto()}
                >
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#3498db'
                    title="Choose Photo"
                    onPress={() => choosePhoto()}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    )
};

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})
