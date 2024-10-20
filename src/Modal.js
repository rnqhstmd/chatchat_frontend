import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'; // styled-components 라이브러리 import

// 모달 배경 스타일 정의
const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 모달 컨테이너 스타일 정의
const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <ModalBackdrop>
            <ModalContainer>
                {children}
                <button onClick={onClose}>Close</button>
            </ModalContainer>
        </ModalBackdrop>,
        document.body
    );
};

export default Modal;
