import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
    let backgroundColor ;
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 5,
                height: 5,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    )
}
const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text>Next</Text>
    </TouchableOpacity>

)
const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text>Skip</Text>
    </TouchableOpacity>

)
const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text>Done</Text>
    </TouchableOpacity>
)

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            NextButtonComponent={Next}
            SkipButtonComponent={Skip}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace('Login')}
            onDone={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/onboarding-img1.png')} />,
                    title: 'Connect to the world',
                    subtitle: 'A New Way To Connect With The World',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/onboarding-img2.png')} />,
                    title: 'Share your favorite',
                    subtitle: 'Share Your Thougths With Similar Kind of People',
                },
                {
                    backgroundColor: '#e9bcde',
                    image: <Image source={require('../assets/onboarding-img3.png')} />,
                    title: 'Become the star',
                    subtitle: 'Let The Spot Ligh Capture You',
                }
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default OnboardingScreen;
