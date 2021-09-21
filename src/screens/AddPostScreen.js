import React, { useState, useContext } from 'react';
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
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';

const AddPostScreen = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
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
        const imageUrl = await uploadImage();
        console.log('Image url: ', imageUrl);
        firestore()
            .collection('Posts')
            .add({
                userId: user.uid,
                post: post,
                postImg: imageUrl,
                postTime: firestore.Timestamp.fromDate(new Date()),
                likes: null,
                comments: null
            })
            .then(() => {
                console.log('Post added!');
                Alert.alert('Post published!', 'Your Post has been published successfully!');
                setPost(null);
            })
            .catch((err) => {
                console.log('Something went wrong with added Post to firestore.');
            })

    }
    const uploadImage = async () => {
        debugger
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
        });

        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setUploading(false);
            setImage(null);

            return url;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    return (
        <View style={styles.container}>
            <InputWrapper>
                {image ? <ImageField source={{ uri: image }} /> : null}
                <InputField
                    placeholder="What's on your mind?"
                    multiline
                    value={post}
                    numberOfLines={4}
                    onChangeText={(value) => setPost(value)}
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
