import { Text } from 'react-native';
import { Card,Button ,Icon } from 'react-native-elements';
import React,{Component} from 'react';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

render () {
	return ( 
		<Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
        <Card title="Contact">
        <Text style={{margin:10}}>{"121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net"}
        </Text>
        <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
        </Card>
        </Animatable.View>
		 );
}
}

export default Contact;
