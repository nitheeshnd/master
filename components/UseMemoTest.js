
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
let renderCount = 0

const UseMemoTest = (props) => {
    console.log("Props", props)
    useEffect(() => {
        renderCount++
    })
    return (
        <View>
            <Text>RenderCount : {renderCount} </Text>
        </View>
    )
}
export default UseMemoTest;