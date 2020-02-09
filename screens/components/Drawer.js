import React, { Component } from 'react'
import { Text, View,Image,TouchableOpacity } from 'react-native'
import { Container, InfoLabel, Center,Row } from './Global_Components'
import Branding from './Branding'
import InstaLink from './InstaLink'
import { SafeAreaView } from 'react-navigation'
import logo_icon from "../iconkit/logo_label.png";
import { ScrollView } from 'react-native-gesture-handler'

export class Drawer extends Component { 
    constructor(props){
        super(props);
    }
    render() {
 
        return (
            <Container>
              <SafeAreaView style={{flex:1,padding:15}}>
              
                 <View style={{alignItems:"flex-end",marginBottom:-30}}>
                  <TouchableOpacity style={{width:50,height:50}} onPress={()=>this.props.navigation.closeDrawer()}>
                    <Row flex={1} style={{justifyContent:"center"}}>
                        <Image source={require("../iconkit/close.png")} style={{width:30,height:30}}/>
                    </Row> 
                  </TouchableOpacity>
                 </View>
                  <View style={{flex:1}}>
                    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                        <View style={{padding:10}}>       
                            <View style={{alignItems:"center"}}>
                                <Image source={logo_icon} />
                            </View>
                        </View>
                        <InfoLabel color="#7f8c8d" style={{paddingBottom:10}}>
                            questionify is an open source Quizz
                            application that lets users to test their
                            knowledge on various topics!
                        </InfoLabel>
                        <InfoLabel color="#e67e22" style={{paddingBottom:10}}>
                            it 's currently under development in future lot of features will be
                            added.
                        </InfoLabel>
                        <Container style={{backgroundColor:"#ecf0f1",borderRadius:10,elevation:4}}>
                            <InfoLabel color="#2980b9" style={{paddingTop:10}}>Instructions:</InfoLabel>
                            <InfoLabel color="#34495e" style={{paddingLeft:10,fontSize:16}}>1.select category</InfoLabel>
                            <InfoLabel color="#34495e" style={{paddingLeft:10,fontSize:16}}>2.select difficulty level</InfoLabel>
                            <InfoLabel color="#34495e" style={{paddingLeft:10,paddingBottom:10,fontSize:16}}>3.click on start to get started!</InfoLabel>
                        </Container>
                        <Container style={{elevation:5}}>
                            <InfoLabel color="#2980b9">Contact:</InfoLabel>
                            <Center style={{padding:10}}>
                                <InstaLink/>
                            </Center>
                        </Container>
                    </ScrollView>
                  </View>
                  <View>
                      <Branding/>
                  </View>
              </SafeAreaView>
            </Container>
        )
    }
}

export default Drawer
