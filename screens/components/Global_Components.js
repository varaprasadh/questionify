import styled from 'styled-components';

export const Container = styled.View `
   background-color: ${props=>props.background||"white"};
   flex:1;
   padding:${props=>props.padding||"0px"};
`;
export const Header = styled.View `
  flex-direction:row;
  align-items:center;
  padding:12px;
`;
export const Label = styled.Text `
    font-weight:bold;
    font-size:30px;
    color: #0caed8;
`
export const Row=styled.View`
 flex-direction:row;
 
 padding:${props=>props.padding||"0px"};
`;
export const InfoLabel = styled.Text `
  font-weight:bold;
  font-size:18px;
  color:${props=>props.color||"black"};
`;