import React, { Component } from 'react';
import { View, Text,Image,Linking,TouchableOpacity} from 'react-native';
import { Container,Row,InfoLabel } from './Global_Components';
import instaIcon from "../iconkit/instagram.png";
class InstaLink extends Component {
   
    handleClick = () => {
        const url="https://www.instagram.com/consious_coder/";
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }else{
                alert("cant");
            }
        });
    };
  render() {
    return (
      
          <Container>
            <TouchableOpacity
                onPress={this.handleClick.bind(this)}
                style={{flex:1}}
                >
                <Row style={{alignItems:"center",padding:10}} >
                    <Image source={instaIcon} style={{width:25,height:25}}/>
                    <InfoLabel color="#e84393" style={{fontSize:20,paddingHorizontal:5}}>/@consious_coder</InfoLabel>
                </Row>
             </TouchableOpacity>
          </Container>
    );
  }
}

export default InstaLink;
