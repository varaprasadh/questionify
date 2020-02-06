import React, { Component } from 'react'
import { Text, View } from 'react-native'
export class TestBoard extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentWillMount(){
      let {navigation}=this.props;
      let category=navigation.getParam('category',"");
      let difficulty = navigation.getParam('difficulty', "");
      let url = new URL("https://opentdb.com/api.php?amount=10&type=multiple")
      let params = new URLSearchParams(url.search.slice(1));
     if(category!=""){
         params.append(category, category)
     }
     if(difficulty!=""){
         params.append(difficulty, difficulty);
     }
     let parsedURL = "https://opentdb.com/api.php?"+params.toString();
     fetch(parsedURL).then(res.res.json()).then(data=>{
         console.log(data);
     })
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default TestBoard
