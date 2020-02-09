import React, { Component } from 'react'
import { Text, View,Image} from 'react-native'
import {Row,Label,InfoLabel} from "./Global_Components";
import logo from "../iconkit/logo.png";
export class Branding extends Component {
    render() {
        return (
           <View style={{flex:1,padding:10,alignItems:"center"}}>
                <Row flex={1} style={{justifyContent:"center",padding:0,alignItems:"flex-end"}}>
                    <Row flex={1} style={{justifyContent:"center"}}>
                        <Image source={logo} style={{width:50,height:50}}/>
                        <Label>Questionify</Label>
                    </Row>
                </Row>
                <InfoLabel color="#bdc3c7">version 1.0</InfoLabel>
            </View>
        )
    }
}

export default Branding
