import React, { Component } from 'react'
import { Text, View, ScrollView,Dimensions,TouchableOpacity,Image} from 'react-native';
import styled from "styled-components";
import { Container, Label, Row, Center, InfoLabel, Circle,Button_G } from './components/Global_Components.js';
import celeb_icon from "./iconkit/celebration.png";
import ErrorView from './components/ErrorView.js';
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const {width:dWidth,height:dHeight}=Dimensions.get('window');

export class TestBoard extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            wrong:0,
            correct:0,
            showresults:false,
            reviewMode:false,
            scrollIndex:0,
            currentQuestion:0,
            clock:15,
            showError:false
        };
        // this.timer=this.timer.bind(this);
    }
    UNSAFE_componentWillMount() {
      let {navigation}=this.props;
     let data=navigation.getParam('data',{results:[]});
    //  fetch(parsedURL).then(res=>res.json()).then(console.log);
     this.setState({
         data:data.results.map(obj=>({...obj,attempted:false,unAnswered:false,answerGiven:"",options:this.shuffle([obj.correct_answer,...obj.incorrect_answers])}))
     });
    } 
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    timer(){
            this.setState({
                clock: this.state.clock - 1
            }, () => {
                if (this.state.clock <= 0) {
                    setTimeout(()=>this.nextStep("", this.state.currentQuestion + 1),500);
                    clearInterval(this.counter);
                }
            });
    }
    componentDidMount(){
        if(this.state.data.length>0){
            this.counter = setInterval(this.timer.bind(this), 1000);
        }
    }
    nextStep(answer,questionNo){
        this.setState({
            currentQuestion:questionNo
        });
        clearInterval(this.counter);
 
        let data=this.state.data.map((obj,i)=>{
              if(i==questionNo-1){
                  obj.attempted=true;
                  obj.answerGiven = answer;
                  if(obj.answerGiven===""){
                      obj.answerGiven=obj.correct_answer;
                      obj.unAnswered=true;
                  }
                  else if(obj.answerGiven===obj.correct_answer){
                      this.setState({
                          correct:this.state.correct+1
                      });
                  }else{
                      this.setState({
                          wrong:this.state.wrong+1
                      });
                  }
              }
              return obj;
        });
        this.setState({
            data:data
        });
        this.processNextStep=setTimeout(()=>{
           if(questionNo==this.state.data.length){
            //send to results page;
            this.setState({
                showresults:true
            });
            clearInterval(this.counter);
        }else{
            this.setState({
                clock:15 
            })
            //bug may arise
            this.scr_view.scrollTo({x:dWidth*questionNo});
            this.counter = setInterval(this.timer.bind(this), 1000);
        }
        },2000);
    } 
    componentWillUnmount(){
        clearTimeout(this.processNextStep);
    }
    showReview(){
        this.setState({
           reviewMode:true,
           showresults:false,
           scrollIndex:0
        });
    }
    scrollBack(){
       this.setState({
           scrollIndex:this.state.scrollIndex>0?this.state.scrollIndex-1:0
       },()=>{
           this.scr_view.scrollTo({x:dWidth*this.state.scrollIndex})
       });

    }
    scrollNext(){
      this.setState({
          scrollIndex:this.state.scrollIndex<=this.state.data.length?this.state.scrollIndex+1:this.state.scrollIndex
      },()=>{
          if(this.state.scrollIndex>=this.state.data.length){
              this.setState({
                  showresults:true,
              })
          }else{ 
             this.scr_view.scrollTo({x:dWidth*this.state.scrollIndex});
          }
          
      });
    }
    goHome(){
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
        
          this.state.showError?  
          <ErrorView/>:
          <Container background="#ecf0f1">
              <View style={{alignItems:"center",padding:10}}>
                  <Label>Questionify</Label>
              </View>
              {!this.state.showresults?(
              <View style={{flex:5,backgroundColor:"#95a5a6"}}>
                <View style={{flex:1}}>
                    <ScrollView 
                        ref={scr_view=>this.scr_view=scr_view}
                        style={{flex:1}} contentContainerStyle={{flexGrow:1}} horizontal pagingEnabled scrollEnabled={false}>
                        <Row flex={1} style={{backgroundColor:"white",width:dWidth*this.state.data.length}}>
                            {
                                this.state.data.map((item,i)=>{
                                    return(
                                       <Question_card key={i}
                                        reviewMode={this.state.reviewMode} 
                                        questionNo={i+1}
                                        data={item}
                                        onAttempted={this.nextStep.bind(this)}
                                        />
                                    )
                                })
                            }
                        </Row>
                    </ScrollView>
                </View>
              </View>):(  
              <View style={{flex:4}}>
                    <ResultCard>
                        <Center style={{flex:1}}>
                            <Image source={celeb_icon} style={{height:100,width:100,margin:20}}/>
                            <Label color="#2ecc71">Congatulations!</Label>
                            <InfoLabel>you made it to the end!</InfoLabel>
                        </Center>
                        <View style={{flex:1}}>
                            <Row style={{justifyContent:"space-around",margin:30}}>
                                <View style={{alignItems:"center"}}>
                                    <Circle background="#2ecc71" diameter={75}>
                                        <InfoLabel style={{fontSize:30}} color="white">{this.state.correct}</InfoLabel>
                                    </Circle>
                                    <InfoLabel color="#27ae60">Correct</InfoLabel>
                                </View>
                                <View style={{alignItems:"center"}}>
                                    <Circle background="#e74c3c" diameter={75}>
                                        <InfoLabel style={{fontSize:30}} color="white">{this.state.wrong}</InfoLabel>
                                    </Circle>
                                    <InfoLabel color="#e74c3c">Wrong</InfoLabel>
                                </View>
                            </Row>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>   
                            <InfoLabel color="#e67e22">Not Answered : </InfoLabel>
                            <InfoLabel color="#e74c3c">{this.state.data.length-(this.state.correct+this.state.wrong)}</InfoLabel>
                        </View>
                        { !this.state.reviewMode &&
                           (<View style={{alignItems:"flex-end"}}>
                            <Button_G
                              background="#27ae60" padH={20} padding={10}
                               onPress={this.showReview.bind(this)}
                              >
                                <InfoLabel color="white">Review</InfoLabel>
                            </Button_G>
                        </View>)
                        }
                    </ResultCard>
                    <View style={{margin:30,alignItems:"center"}}>
                    <Button_G 
                    onPress={this.goHome.bind(this)}
                    background="#3498db" padH={30}>
                        <InfoLabel color="white">Go Home</InfoLabel>
                    </Button_G>
                </View>
                </View>
                )}
                {
                    (this.state.reviewMode &&!this.state.showresults )?(
                        <View style={{flex:1}}>
                            <Row flex={1} style={{}}>
                                <Button_G 
                                 style={{flex:1,justifyContent:"center",alignItems:"center",margin:25,elevation:3}}
                                 onPress={this.scrollBack.bind(this)}
                                 disabled={this.state.scrollIndex<=0}
                                 >
                                    <InfoLabel color="#2ecc71">Prev</InfoLabel>
                                </Button_G>
                                <Button_G 
                                 style={{flex:1,justifyContent:"center",alignItems:"center",margin:25,elevation:3}}
                                 onPress={this.scrollNext.bind(this)}
                                 >
                                    <InfoLabel color="#2ecc71">{this.state.scrollIndex>=this.state.data.length?"Done":"Next"}</InfoLabel>
                                </Button_G>
                            </Row>
                        </View>
                    ):(
                        (!this.state.reviewMode&&!this.state.showresults)&&(
                            <View style={{flex:1,justifyContent:"center"}}>
                                <Center>
                                    <InfoLabel color="#e74c3c">- {this.state.clock} Seconds</InfoLabel>
                                </Center>
                                </View>
                        )
                    )
                }
            </Container>
        )
    }
}

class Question_card extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            wrongOption:null,
            attempted:false
        }
        this.validateAnswer=this.validateAnswer.bind(this);
    }

    validateAnswer(option){
        if(option===this.state.data.correct_answer){
           //Do Nothing
           this.setState({
               attempted:true
           })
           
        }else{
            this.setState({
              attempted:true,
              wrongOption:option
            });
        }
        this.props.onAttempted(option, this.props.questionNo);
        
    }
    render(){
        let item=this.state.data;
        let options =item.options; 
        return(
            <Card> 
                <View style={{flex:1}}>
                    <Question>{entities.decode(item.question)}</Question>
                    <Options>
                        { 
                            options.map((opt,i)=>{
                                let isCorrect=item.attempted && item.correct_answer===item.answerGiven && opt===item.answerGiven;
                                let isWrong=item.attempted && opt===item.answerGiven;
                                return(
                                    <Option key={i}
                                      showCorrect={isCorrect}
                                      showFalse={isWrong}
                                      onPress={()=>this.validateAnswer(opt)}
                                      disabled={item.attempted || this.props.reviewMode}
                                    >
                                        <Option_Text color={(isCorrect||isWrong)?"white":""}>{opt}</Option_Text>
                                    </Option>
                                )
                            }) 
                        } 
                    </Options>
                    {(this.props.reviewMode && item.unAnswered) &&(<InfoLabel color="#e67e22">could'nt answered!</InfoLabel>)}
                </View>
            </Card>
        )
    }
}
const Card=styled.View`
   padding:15px;
   background-color:white;
   width:${dWidth}px;
   flex:1;
   margin: 30px 20px;
   alignItems:stretch;
   border-radius:15px;
   ${'' /* border:1px solid black; */}
   elevation:6;
`;
const ResultCard=styled.View`
   padding:20px;
   background-color:white;
   flex:1;
   margin: 30px 20px;
   border-radius:15px;
   elevation:6;
   justifyContent:space-around;
`;
const Question=styled.Text`
 font-size:18px;
 color: #34495e;
 font-weight:bold;
`;
const Options=styled.View`
 flex:1;
 margin:30px 0px;
`
const Option=styled.TouchableOpacity`
  flex:1;
  padding:10px;
  margin:10px 0px;
  border:1px solid #95a5a6;
  alignItems:center;
  justify-content:center;
  backgroundColor:${props=>((!props.showCorrect && !props.showFalse)?"white":(props.showCorrect)?"#2ecc71":"#e74c3c")};
  border-radius:10px;
`
const Option_Text=styled.Text`
 font-weight:bold;
 font-size:16px;
 text-align:center;
 color:${props=>props.color?props.color:"black"};
`
export default TestBoard
