import React, { Component,} from 'react'
import { Text, View,Animated,Image,Easing} from 'react-native'
import { Container, InfoLabel, Center } from './Global_Components'
import logo from "../iconkit/logo.png";

export class Loader extends Component {

    render() {

        return (
            <Container>
                <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                    <Animated.View >
                       <Image source={logo}/>
                   </Animated.View>
                   <InfoLabel>Loading...</InfoLabel>
                </View>
                <View>
                   <Center>
                       <InfoLabel color="#3498db" style={{padding:5}}>Questionify</InfoLabel> 
                       <InfoLabel color="#bdc3c7">Version 1.0</InfoLabel>
                   </Center>
                </View>
            </Container>
        )
    }
}

export default Loader
