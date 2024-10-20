// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RoomListPage from './pages/RoomListPage';
import ChatRoomPage from './pages/ChatRoomPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<AuthPage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/rooms" element={<RoomListPage />} />
                    <Route path="/chat/:roomId" element={<ChatRoomPage />} />
                    <Route
                        path="/"
                        element={isLoggedIn ? <RoomListPage /> : <AuthPage setIsLoggedIn={setIsLoggedIn} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
