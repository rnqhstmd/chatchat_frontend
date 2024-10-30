// roomService.js

import axiosInstance from './axiosConfig';

export const getAllRooms = () => {
    return axiosInstance.get('/rooms');
};

export const createRoom = (name) => {
    return axiosInstance.post('/rooms', { name });
};

export const leaveRoom = (roomId) => {
    return axiosInstance.delete(`/rooms/${roomId}/leave`);
};

export const searchUserByEmail = (email) => {
    return axiosInstance.get(`/users/search?email=${email}`);
};

export const sendInvite = (roomId, email) => {
    return axiosInstance.post(`/api/rooms/${roomId}/invite`, { roomId, username: email });
};

export const inviteUserToRoom = (roomId, username) => {
    return axiosInstance.post(`/rooms/${roomId}/invite`, { roomId, username });
};

export const sendLeave = (roomId) => {
    return axiosInstance.delete(`/rooms/${roomId}/leave`);
};

// 채팅방 메시지 로드 함수 추가
export const getRoomMessages = (roomId) => {
    return axiosInstance.get(`/rooms/${roomId}/enter`);
};
