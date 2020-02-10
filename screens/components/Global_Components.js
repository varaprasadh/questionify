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
    color: ${props=>props.color||"#0caed8"};
`
export const Row=styled.View`
 flex-direction:row;
 flex:${props=>props.flex||0};
 padding:${props=>props.padding||"0px"};
`;
export const InfoLabel = styled.Text `
  font-weight:bold;
  font-size:18px;
  color:${props=>props.color||"black"};
`;

export const Center=styled.View`
 align-items:center;
`
export const Circle=styled.View`
 width:${p=>p.diameter||0}px;
 height:${p=>p.diameter||0}px;
 background:${p=>p.background||"white"};
 border-radius:${p=>Math.ceil(p.diameter/2)||0}px;
 justify-content:center;
 align-items:center;
`
export const Button_G = styled.TouchableOpacity `
  background-color:${props=>props.disabled?"#bdc3c7":props.background||"white"};
  padding:${p=>p.padding||"10"}px ${p=>p.padH||10}px;
  border-radius:10px;
`;