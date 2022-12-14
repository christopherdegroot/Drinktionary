import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export default function AgeModal() {
  const [showModal, setShowModal] = useState(true);
  const [message, setMesasage] = useState(
    "To Continue, Please Enter Your Date of Birth"
  );
  const [age, setAge] = useState(0);

  const handleDate = function (date) {
    let dateOfBirth = new Date(date);
    let monthDifference = Date.now() - dateOfBirth.getTime();
    let givenAge = new Date(monthDifference);
    let year = givenAge.getUTCFullYear();
    let age = Math.abs(year - 1970);
    setAge(age);
    if (age >= 19) {
      setShowModal(false);
    } else {
      setMesasage("Please Drink Responsibly");
    }
  };

  return (
    <>
      {showModal && (
        <>
          <ModalOverlay>
            <Container className="flex-column-centered card-shadow">
              <Message>{message}</Message>
              <DatePicker
                onChange={(e) => {
                  handleDate(e.target.value);
                }}
                type="date"
              ></DatePicker>
            </Container>
          </ModalOverlay>
        </>
      )}
    </>
  );
}

const Message = styled.h1`
  text-align: center;

  @media only screen and (min-width: 768px) {
    width: 500px;
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
  z-index: 99;

  backdrop-filter: blur(8px);
`;

const Container = styled.div`
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

const DatePicker = styled.input`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`;
