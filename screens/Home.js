import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity ,ScrollView} from 'react-native';
import styled from 'styled-components';
import {Label,Container,Header, Row} from "./components/Global_Components";
import icon_menu from "./iconkit/menu.png"; 
import Categories from './components/Categories';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        category:"",
        difficulty:"",
    };
    this.setDifficulty=this.setDifficulty.bind(this);
  }
componentWillMount(){
    fetch('https://opentdb.com/api_category.php').then(res=>res.json()).then(data=>{
        let items = data.trivia_categories;
        items=items.map(item=>item.name);
        this.setState({
            data:items,
            error:false,
            loading:false
        });
    }).catch(err=>{
        this.setState({
            loading:false,
            error:true
        });
    })
}
 setCategory(item){
    this.setState({
        category: item
    });
 }
 setDifficulty(item){
    this.setState({
        difficulty: item
    });
 }
 

  render() {
      let isValidState=this.state.category!=""&&this.state.difficulty!="";
    return (
      <Container>
         <Header>
             <Image source={icon_menu} style={{width:45,height:45}}/>
             <View style={{flex:1,alignItems:"center"}}>
                 <Label>Questionify</Label>
             </View>
         </Header>
         <View style={{flex:2}}>
            <Categories items={this.state.data} onSetCategory={this.setCategory.bind(this)}/>
         </View>
         <View style={{paddingHorizontal:10}}> 
            <InfoLabel>choose difficulty : </InfoLabel>
            <View style={{padding:10,flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around"}}>
                  <TouchableOpacity style={{width:"30%"}} onPress={()=>this.setDifficulty("easy")}>
                      <Diffculty_Button background="#27ae60" >Easy</Diffculty_Button>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:"30%"}} onPress={()=>this.setDifficulty("medium")}>
                      <Diffculty_Button background="#e67e22" >Medium</Diffculty_Button>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:"30%"}} onPress={()=>this.setDifficulty("hard")}>
                      <Diffculty_Button background="#e74c3c" >Hard</Diffculty_Button>
                  </TouchableOpacity>
            </View>
         </View>
         <View style={{padding:10}}>
             {
            this.state.category!=""?(
                <Row >
                    <InfoLabel minWidth={true}>selected category : </InfoLabel>
                    <InfoLabel color="#27ae60">{this.state.category}</InfoLabel>
               </Row>
            ):
            <InfoLabel color="#e74c3c">please choose a category!</InfoLabel>
           }
           {
            this.state.difficulty!=""? (
                <Row >
                    <InfoLabel >selected difficulty : </InfoLabel>
                    <InfoLabel color="#27ae60">{this.state.difficulty}</InfoLabel>
               </Row>
            ):
               <InfoLabel color="#e74c3c">please choose a difficulty level!</InfoLabel>
           }
         </View>
         
         <View style={{alignItems:"center",paddingBottom:10}}>
             <Button_G 
                onPress={()=>this.props.navigation.push('TestBoard',{category:this.state.category,difficulty:this.state.difficulty})}
                disabled={!isValidState} background={isValidState?"#2ecc71":"#7f8c8d"}>
                 <InfoLabel color="white">START TEST</InfoLabel>
             </Button_G>
         </View>
      </Container>
    );
  }
}

const InfoLabel = styled.Text`
  font-weight:bold;
  font-size:18px;
  color:${props=>props.color||"black"};
  flexShrink:1;
`;
const Button_G=styled.TouchableOpacity`
  background-color:${props=>props.background||"white"};
  padding:10px;
  border-radius:10px;
`;
const Diffculty_Button=styled.Text`
  padding:10px 20px;
  color:${props=>props.background||"black"};
  border-radius:10px;
  border:1px ${props=>props.background||"black"};
  text-align:center;
  margin:10px 0px;
`;

export default Home;
