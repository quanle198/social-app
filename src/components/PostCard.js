import React from 'react';
import {
    Card,
    UserInfo,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Devider
} from '../styles/FeedStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostCard = ({ item }) => {

    let likeIcon = item.liked ? 'heart' : 'heart-outline';
    let likeIconColor = item.liked ? '#2e64e5' : '#333';
    let likeText = 'Like';
    let commentText = 'Comment';

    if (item.likes == 1) {
        likeText = '1 Like'
    } else if (item.likes > 1) {
        likeText = item.likes + ' Likes'
    }

    if (item.comments == 1) {
        commentText = '1 Comment'
    } else if (item.comments > 1) {
        commentText = item.comments + ' Comments'
    }

    return (
        <Card>
            <UserInfo>
                <UserImg source={item.userImg} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.postTime.toString}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImg source={{ uri: item.postImg }} /> : <Devider />}
            <InteractionWrapper>
                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name='md-chatbubble-outline' size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
            </InteractionWrapper>
        </Card>
    )
}

export default PostCard
