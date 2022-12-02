import styled from "@emotion/styled";
import scrollToTop from "../src/utils/scrollToTop";

export default function ScrollToTopButton() {
  return (
    <ScrollButton
      onClick={() => {
        scrollToTop();
      }}
    >
      Scroll to Top
    </ScrollButton>
  );
}

const ScrollButton = styled.button`
  font-size: 1.8rem;
  height: 4rem;
  border-radius: 4rem;

  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  padding: 15px;
  font-size: 18px;

  background-color: cornFlowerblue;
  color: white;
  border: 0.1rem solid white;

  display: flex;
  align-items: center;
  justify-content: center;

  /* customizable */

  :hover {
    opacity: 0.4;
    cursor: pointer;
  }

  :active {
    opacity: 1;
  }

  &.disabledBtn {
    background-color: grey;
    border: 0.1rem solid;
    color: grey;

    :hover {
      cursor: default;
      opacity: 1;
    }
  }
`;

// margin:
// margin-top:
// margin-bottom:
// margin-left:
// margin-right:
// width: min-width:
// max-width:
// padding:
