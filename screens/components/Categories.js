import React, { Component} from 'react'
import { Text, View,ScrollView,TouchableOpacity} from 'react-native'
import styled from 'styled-components';
import { Container, Label,InfoLabel } from './Global_Components';

export class Categories extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
           <Container background="#ecf0f1">
              <View style={{flex:1,padding:10}}>
                <InfoLabel> choose category :</InfoLabel>
                <View style={{flex:1}}>
                 <ScrollView style={{flex:1}}>
                 {
                     this.props.items.map((item,i)=>{
                         return (
                             <TouchableOpacity key={i} onPress={()=>this.props.onSetCategory(item)}>
                                <Item >{item.name}</Item>
                             </TouchableOpacity>
                             )
                     }) 
                 }
                 </ScrollView>
                </View>
              </View>
           </Container>
        )
    }
}

const Item=styled.Text`
  font-size:20px;
  padding:5px 10px;
  border:1px #7f8c8d;
  border-radius:10px;
  margin:5px 0px;
  background-color:white;
`;


export default Categories
