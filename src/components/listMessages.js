import React, { Component } from 'react';
import List from 'material-ui/List/List';
import Message from './message';

class ListMessages extends Component{
    render () {
        return <List>
            {this.props.cities.map((item, i) =>
                <Message key={i} author={item.author} city={item.name}/>
            )}
        </List>
    }
}

export default ListMessages