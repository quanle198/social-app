import styled from 'styled-components';

export const InputWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #2e64e515;
    width: 100%;
`;

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
    width: 90%;
`;

export const ImageField = styled.Image`
    width: 100%;
    height: 250px;
`;
export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #2e64e515;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    color: #2e64e5;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;