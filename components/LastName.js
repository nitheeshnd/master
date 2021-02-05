

import React, { useState, useEffect, memo } from 'react'
import { Text, View } from 'react-native'


const LastName = (props) => {
    console.log("Last Name", props.name)
    return (
        <View>
            <Text>Last name:{props.name}</Text>
        </View>
    )
}


export default memo(LastName);