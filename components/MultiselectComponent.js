import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

  export default function MultiSelectComponent(props){
    const ref = useRef(null);
    const [selected, setSelected] = useState([]);
    const [tag, setTag] = useState([]);

    
    useEffect(() => {
        console.log(selected)
      }, [selected]);
    
    const handleSelect = (arr) => {
        const result = [];
        props.data.map((specialty, i) => {
            if (arr.includes(i)) {
                result.push(specialty.label)
            }
        })
        console.log('VALUE IS', result)
        setSelected(result)
        console.log("props datakey", props.dataKey)
        props.handleCreation(props.dataKey, result)
    };

    return (
        <View style={[styles.multiSelectContainer,
        selected.length===0 && {height : 50} 
            ]}>
        <MultiSelect
        activeColor= '#E9D3F1'
        ref={ref}
        style={styles.multiselect}
        // fontFamily = {'Greycliff-Regular'}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle = {styles.itemTextStyle}
        textColor= '#fdfbfc'
        activeOutlineColor= '#652CB3'
        selectionColor= {styles. selectionColor}
        backgroundColor={'rgba(0,0,0,0.2)'}
        data={props.data}
        alwaysRenderSelectedItem={true}
        labelField={props.labelField}
        valueField={props.valueField}
        placeholder={props.placeholder}
        searchPlaceholder={props.searchPlaceholder}
        value={tag}
        onChange={(item) => {
            handleSelect(item);
            console.log('ITEM IS', item)
            setTag(item)
        }}
        selectedStyle={styles.selectedStyle}
      />
      </View>
    );
  };


const styles = StyleSheet.create({
//MULTISELECT STYLE
multiSelectContainer: {
    marginTop: 9,
    marginBottom: 9,
    display: 'flex',
    justifyContent: 'flex-start', 
  },
  multiselect: {
    height: 50,
    paddingHorizontal: 14,
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 4,
    backgroundColor: '#fdfbfc',
  },
  inputSearchStyle: {
    fontFamily: "Greycliff-Regular",
    height: 25,
    fontSize: 16,
  },
  selectedStyle: {
    fontFamily: "Greycliff-Regular",
    backgroundColor: '#E9D3F1',
    borderRadius: 10,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    padding: 2,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  wrapSelectAll: {
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  selectionColor : {
    backgroundColor: '#E9D3F1',
  },
  itemTextStyle: {
    fontFamily: "Greycliff-Regular",
  },
  placeholderStyle: {
    fontFamily: "Greycliff-Regular",
  },
  selectedTextStyle: {
    fontFamily: "Greycliff-Regular",
    color: '#652CB3',
  },
  });