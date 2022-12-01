import styled from "@emotion/styled";
import { useState } from "react";

export default function AgeModal() {
  const [showModal, setShowModal] = useState(true);

  const handleDate = function (date) {
    let currentTime = new Date();
    console.log("current time: ", currentTime);
    console.log("given date:", date);
  };

  return (
    <>
      {showModal && (
        <>
          <ModalOverlay>
            <Container className="flex-column-centered card-shadow">
              <h1>Please Enter your Date of Birth</h1>
              <DatePicker>
                <input
                  onChange={(e) => {
                    handleDate(e.target.value);
                  }}
                  type="date"
                ></input>
              </DatePicker>
            </Container>
          </ModalOverlay>
        </>
      )}
    </>
  );
}

const CloseModalButton = styled.button`
  background-color: inherit;
  position: absolute;
  padding: 1rem;

  :hover {
    cursor: pointer;
    opacity: 0.4;
  }
`;

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4);
  :hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
  border-radius: 1.6rem;
  position: fixed;
  z-index: 10;
`;

const DatePicker = styled.div``;
