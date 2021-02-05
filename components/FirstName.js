

import React, { useState, useEffect, memo } from 'react'
import { Text, View } from 'react-native'


const FirstName = (props) => {
    console.log("First Name", props.name)
    return (
        <View>
            <Text>First Name:{props.name}</Text>
        </View>
    )
}


export default memo(FirstName);