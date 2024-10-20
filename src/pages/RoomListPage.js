import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllRooms, getRoomMessages } from '../api/roomService';

const RoomListPage = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await getAllRooms();
            setRooms(response.data.content);
        };
        fetchRooms();
    }, []);

    const handleJoinRoom = async (roomId) => {
        try {
            // 메시지 불러오기 API 호출 (필요한 경우 사용 가능)
            await getRoomMessages(roomId);
            // 채팅방 페이지로 이동
            navigate(`/chat/${roomId}`);
        } catch (error) {
            console.error('Failed to join room:', error);
        }
    };

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.roomId}>
                        {room.name}
                        {/* 클릭 시 handleJoinRoom을 호출하여 채팅방 입장 */}
                        <button onClick={() => handleJoinRoom(room.roomId)}>Join Room</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomListPage;
