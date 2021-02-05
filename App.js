import React, { useState, useEffect, useMemo, useCallback } from 'react'
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FirstName from './components/FirstName'
import LastName from './components/LastName'
import UseMemoTest from './components/UseMemoTest';
import Button from './components/Button';
import Count from './components/Count'
const translationGetters = {
  en: () => require('./rni18/en.json'),
  nl: () => require('./rni18/nl.json'),
  ur: () => require('./rni18/ur.json')
}



const App = () => {

  const [fistname, setFistName] = useState("Nitheesh");
  const [lastname, setLastName] = useState("Devadiga");
  const [salary, setSalary] = useState(5000)
  const [age, setAge] = useState(28)

  const [i, setI] = useState(0)
  translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  )

  setI18nConfig = () => {
    const fallback = { languageTag: 'en' }
    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback

    translate.cache.clear()
    i18n.translations = { [languageTag]: translationGetters[languageTag]() }
    i18n.locale = languageTag
  }

  handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    console.log("Act as component did mount")
    RNLocalize.addEventListener('change', handleLocalizationChange)
    setI18nConfig()

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange)
    }
  }, []);


  increment = () => {
    setI(i + 1)
  }

  const UseMemoTestMemo = useMemo(() => {
    return <UseMemoTest></UseMemoTest>
  }, [i]
  )

  const updateAge = useCallback(() => {
    setAge(age + 1)
  }, [age])


  //tetsing

  const updateSalary = useCallback(() => {
    setSalary(salary + 1000)
  }, [salary])
  // componentDidMount() {
  //   RNLocalize.addEventListener('change', this.handleLocalizationChange)
  // }

  // componentWillUnmount() {
  //   RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  // }
  // useEffect(() => {
  //   RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  // }, []);
  return (
    <SafeAreaView style={styles.safeArea} >
      <Text style={styles.value}>{translate('hello')}</Text>
      <Text style={styles.value}>{translate('Good morning')}</Text>
      <Text style={styles.value}>Currency: {translate('Currency')}</Text>
      <Text style={styles.value}>Country: {RNLocalize.getCountry()}</Text>
      <TouchableOpacity style={{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      }} onPress={() => setFistName("reema")}><Text>Click</Text></TouchableOpacity>
      <FirstName name={fistname} />

      <LastName name={lastname} />
      <TouchableOpacity style={{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      }} onPress={() => setLastName("dsouza")}><Text>Click</Text></TouchableOpacity>
      {
        UseMemoTestMemo
      }
      {/* <UseMemoTest></UseMemoTest> */}
      <Count text={'Age:'} count={age}></Count>
      <Button handleClick={updateAge}>Update Age</Button>

      <Count text={'Salary:'} count={salary}></Count>
      <Button handleClick={updateSalary}>Update Salary</Button>


      <TouchableOpacity style={{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      }} onPress={increment}><Text>Increment Click</Text></TouchableOpacity>

      {/* <View style={{ borderWidth: 2, borderColor: 'red', flex: 1 }}></View> */}
    </SafeAreaView >
  )

}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  value: {
    fontSize: 24
  }
})

export default App