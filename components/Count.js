import React from 'react';
import { Text } from 'react-native'

const Count = (props) => {
    console.log("Count called for", props.text)
    return (<Text>{props.text}: {props.count}</Text>)
}

export default React.memo(Count);