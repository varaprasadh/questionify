import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Label,Container,Header, Row} from "./components/Global_Components";
import icon_menu from "./iconkit/menu.png"; 
import Categories from './components/Categories';
import ErrorView from './components/ErrorView';
import Loader from './components/Loader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        category:null,
        difficulty:"",
        error:false,
        loading:true
    };
    this.setDifficulty=this.setDifficulty.bind(this);
  }
UNSAFE_componentWillMount(){

    fetch('https://opentdb.com/api_category.php').then(res=>res.json()).then(data=>{
        let items = data.trivia_categories;
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
 startTest(){
    let params = [];
    let {category,difficulty}=this.state;
    if (category != "") {
        params.push("category=" + category.id);
    }
    if (difficulty != "") {
        params.push("difficulty=" + difficulty);
    }
    let parsedURL = "https://opentdb.com/api.php?amount=10&type=multiple&" + params.join("&");
    console.log(parsedURL)
     this.setState({
         loading:true
     });
     fetch(parsedURL).then(res=>res.json()).then(data=>{
         this.setState({
             loading:false,
             error:false
         });
        this.props.navigation.push('TestBoard',{data});
     }).catch(err=>{
         this.setState({
             loading:false,
             error:true
         });
     })
    
 }
 

  render() {
      let isValidState=this.state.category!=""&&this.state.difficulty!="";
      console.log(this.state.category != null,"this ius funny");
      console.log(this.state.difficulty,this.state.category);
    return (
      this.state.loading?(
          <Loader/>
      ):this.state.error?(
         <ErrorView/>
      ):
      (<Container>
         <Header>
             <TouchableOpacity
              onPress={()=>this.props.navigation.openDrawer()}
             >
                 <Image source={icon_menu} style={{width:45,height:45}}/>
             </TouchableOpacity>
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
            this.state.category!=null?(
                <Row style={{padding:30,backgroundColor:"red"}}>
                    <InfoLabel>selected category : </InfoLabel>
                    <InfoLabel color="#27ae60">{this.state.category.name}</InfoLabel>
               </Row>
            ):
            (<InfoLabel color="#e74c3c">please choose a category!</InfoLabel>)
           }
           {
            this.state.difficulty!==""?(
                <Row>
                    <InfoLabel >selected difficulty : </InfoLabel>
                    <InfoLabel color="#27ae60">{this.state.difficulty}</InfoLabel>
               </Row>
            ):(<InfoLabel color="#e74c3c">please choose a difficulty level!</InfoLabel>)
           }
         </View>
         
         <View style={{alignItems:"center",paddingBottom:10}}>
             <Button_G 
                onPress={this.startTest.bind(this)}
                disabled={!isValidState} background={isValidState?"#2ecc71":"#7f8c8d"}>
                 <InfoLabel color="white">START TEST</InfoLabel>
             </Button_G>
         </View>
      </Container>)
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

