import React, { Component } from 'react';

import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import '../stules/message.css';



class Message extends Component {
    render () {
        return <ListItem
            disabled={true}
            leftAvatar={<Avatar>{this.props.author}</Avatar>}
            secondaryText={
                <p className="bubble ">{this.props.city}</p>
            }
        >
        </ListItem>

    }
}

export default Message
