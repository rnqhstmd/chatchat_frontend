import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { leaveRoom, searchUserByEmail, inviteUserToRoom } from '../api/roomService';
import Modal from '../Modal'; // 모달 컴포넌트 경로 확인
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatRoomPage = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const stompClient = useRef(null);

    useEffect(() => {
        connectWebSocket();
        return () => {
            disconnectWebSocket();
        };
    }, [roomId]);

    const connectWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect(
            {},
            () => {
                stompClient.current.subscribe(`/topic/room.${roomId}`, onMessageReceived);
            },
            onError
        );
    };

    const disconnectWebSocket = () => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.unsubscribe();
            stompClient.current.disconnect();
        }
    };

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prev) => [...prev, message]);
    };

    const sendMessage = () => {
        if (messageInput.trim() && stompClient.current.connected) {
            stompClient.current.send(
                `/app/chat.sendMessage`, // Ensure you have '/app' prefix if configured in Spring back-end
                {},
                JSON.stringify({
                    roomId,
                    message: messageInput,
                })
            );
            setMessageInput('');
        }
    };

    const handleLeave = async () => {
        try {
            await leaveRoom(roomId);
            navigate('/rooms');
        } catch (error) {
            console.error('Error leaving room:', error);
        }
    };

    const toggleInvite = () => setShowInvite(!showInvite);

    const handleSearchUser = async () => {
        try {
            const response = await searchUserByEmail(inviteEmail);
            setUsers(response.data);
        } catch (error) {
            console.error('Search user error:', error);
        }
    };

    const handleInviteUser = async (username) => {
        try {
            await inviteUserToRoom(roomId, username);
            alert(`User ${username} invited successfully!`);
            toggleInvite();
        } catch (error) {
            console.error('Invite user error:', error);
        }
    };

    const onError = (error) => {
        console.error('WebSocket Error:', error);
    };

    return (
        <div>
            <h2>Chat Room: {roomId}</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>
                        {msg.sender}: {msg.content}
                    </p>
                ))}
            </div>
            <input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={toggleInvite}>Invite People</button>
            <button onClick={handleLeave}>Leave Room</button>
            {showInvite && (
                <Modal onClose={toggleInvite}>
                    <input
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="Search user by email"
                    />
                    <button onClick={handleSearchUser}>Search</button>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                {user.username} ({user.email})
                                <button onClick={() => handleInviteUser(user.username)}>Invite</button>
                            </li>
                        ))}
                    </ul>
                </Modal>
            )}
        </div>
    );
};

export default ChatRoomPage;
