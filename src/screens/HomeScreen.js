import React, { useEffect, useState } from 'react';

import {
    Container,
} from '../styles/FeedStyles'
import PostCard from '../components/PostCard';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Posts = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../../assets/users/user-3.jpg'),
        postTime: '4 mins ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../../assets/posts/post-img-3.jpg'),
        liked: true,
        likes: '14',
        comments: '5',
    },
    {
        id: '2',
        userName: 'John Doe',
        userImg: require('../../assets/users/user-1.jpg'),
        postTime: '2 hours ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '8',
        comments: '0',
    },
    {
        id: '3',
        userName: 'Ken William',
        userImg: require('../../assets/users/user-4.jpg'),
        postTime: '1 hours ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../../assets/posts/post-img-2.jpg'),
        liked: true,
        likes: '1',
        comments: '0',
    },
    {
        id: '4',
        userName: 'Selina Paul',
        userImg: require('../../assets/users/user-6.jpg'),
        postTime: '1 day ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../../assets/posts/post-img-4.jpg'),
        liked: true,
        likes: '22',
        comments: '4',
    },
    {
        id: '5',
        userName: 'Christy Alex',
        userImg: require('../../assets/users/user-7.jpg'),
        postTime: '2 days ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '0',
        comments: '1',
    },
];

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = [];
                await firestore()
                    .collection('Posts')
                    .get()
                    .then(querySnapshot => {
                        console.log('Total users: ', querySnapshot.size);

                        querySnapshot.forEach(documentSnapshot => {
                            // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                            const { userId, post, postImg, postTime, likes, comments } = documentSnapshot.data();
                            list.push({
                                id: documentSnapshot.id,
                                userId: userId,
                                userName: 'User name',
                                userImg: require('../../assets/users/user-7.jpg'),
                                postTime: postTime,
                                post,
                                postImg,
                                liked: false,
                                likes,
                                comments
                            })
                        });
                    });

                setPosts(list);

                if (loading) {
                    setLoading(false);
                };

                console.log('Posts: ', posts);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();

    }, [])
    return (
        <Container>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <PostCard item={item} />
                }
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    )
};

export default HomeScreen;
