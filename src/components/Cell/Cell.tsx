import React, { FC, useState } from 'react';
import styled from 'styled-components';

interface CellProps {
   value: string | null;
   index: number;
   currentPlayer?: string | null;
   currentUserTurn?: string | null;
   changeTurn: (i:number) => (void);
}

const CellWrapper = styled.div`
   background-color: #7abdd7;
   border: 2px solid #113089;
   height: 10vh;
   font-size: 64px;
`;

const Cell: FC<CellProps> = ({value, currentPlayer, currentUserTurn, changeTurn, index  }) => {
   
   return (
      <CellWrapper onClick={() => changeTurn(index)}>
         {value}
      </CellWrapper>
   )
};

export default Cell;
