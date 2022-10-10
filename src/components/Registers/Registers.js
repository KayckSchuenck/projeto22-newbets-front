import styled from "styled-components";

export default function Registers({
  won,
  amount,
  odd,
  finished,
  type,
  homeScore,
  value,
  awayScore,
}) {
  const potencialReturn = (amount * odd - amount).toFixed(2);
  return (
    <Block>
      {type ? (
        <p>
          {type} {value} gols
        </p>
      ) : homeScore !== undefined ? (
        <p>
          Placar Final {homeScore}x{awayScore}
        </p>
      ) : (
        <p>Vencedor:{value}</p>
      )}
      Valor apostado: R${amount.toFixed(2)}
      {finished ? (
        <>
          Retorno: <span $win={won}>R${potencialReturn}</span>
        </>
      ) : (
        <p>Retorno potencial: R${potencialReturn}</p>
      )}
    </Block>
  );
}

const Block = styled.div`
  span {
    color: ${(props) => (props.$win ? "green" : "red")};
  }
  margin-bottom: 5px;
  padding: 10px;
  width: 40vw;
  color: #e4e4e4;
`;
