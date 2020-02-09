import React, { Component } from 'react'
import {View,Image } from 'react-native'
import { Container, Center, Circle, InfoLabel, Label,Row } from './Global_Components'

import InstaLink from './InstaLink';
import Branding from './Branding';
export class ErrorView extends Component {
    render() {
        return (
            <Container>
                <View style={{flex:4,justifyContent:"center"}}>
                    <Center>
                        <Circle diameter={100} background="#9b59b6">
                            <InfoLabel color="white">Error</InfoLabel>
                        </Circle>
                            <InfoLabel style={{paddingTop:30}}
                            color="#e74c3c">We Do Mistakes As This App Did!</InfoLabel>
                    </Center>
                </View>
                <Branding/>
                <View style={{flex:1}}>
                   <Center style={{flex:1}}>
                        <InfoLabel color="#27ae60" style={{padding:20}}>
                                Contact for support and issues 
                        </InfoLabel>
                        <View style={{flex:1}}>
                            <InstaLink/>
                        </View>
                    </Center>
                </View>
                
            </Container>
        )
    }
}

export default ErrorView
