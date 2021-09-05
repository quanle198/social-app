import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Alert,
    ActivityIndicator,
    Text
} from 'react-native';

import { InputWrapper, InputField, ImageField, SubmitBtn, SubmitBtnText, StatusWrapper } from '../styles/AddPostStyle';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const AddPostScreen = ({ navigation }) => {

    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

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
    };

    const choosePhoto = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true
        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
            setImage(imageUri)
        });
    };

    const submitPost = async () => {
        const imageUri = image;
        let filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        setUploading(true);
        setTransferred(0);

        const task = storage().ref(filename).putFile(imageUri);
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
        });

        try {
            await task;
            setUploading(false);
            Alert.alert('Image uploaded!', 'Your Image has been uploaded to the firebase cloud storage successfully!')
        } catch (error) {
            console.log(error)
        }
        setImage(null)
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
                {uploading ? (
                    <StatusWrapper>
                        <Text>{transferred} % Completed!</Text>
                        <ActivityIndicator size='large' color='#333'></ActivityIndicator>
                    </StatusWrapper>
                ) : (
                    <SubmitBtn onPress={() => submitPost()}>
                        <SubmitBtnText>Post</SubmitBtnText>
                    </SubmitBtn>
                )}
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
