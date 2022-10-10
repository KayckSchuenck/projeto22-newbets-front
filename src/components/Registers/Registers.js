import styled from "styled-components";

export default function Registers({ won, amount, odd, id, finished }) {
  const potencialReturn = (amount * odd - amount).toFixed(2);
  return (
    <Block>
      <span>
        Aposta número {id}
        Valor apostado:{amount}
        {finished ? (
          <p $won={won}>Retorno:{potencialReturn}</p>
        ) : (
          <p>Retorno potencial:{potencialReturn}</p>
        )}
      </span>
    </Block>
  );
}

const Block = styled.div`
  p {
    color: ${(props) => (props.$won ? "green" : "red")};
  }
`;
