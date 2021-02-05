import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

function Button({ handleClick, children }) {
    console.log("props", children)
    return (
        <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={handleClick}><Text>{children}</Text></TouchableOpacity>)
}

export default Button;