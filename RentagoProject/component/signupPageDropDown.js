import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const SignupPageDropDown = ({ setUserType }) => {
    const [selected, setSelected] = React.useState("");
  
    const data = [
        { key: 'Student', value: 'Student' },
        { key: 'Landlord', value: 'Landlord' },
        { key: 'Student/Landlord', value: 'Student/Landlord' },
    ];

    const handleSelection = (value) => {
        setSelected(value);
        setUserType(value); // Pass the selected value to the parent component
    };
  
    return (
      <View style={styles.container}>
        <SelectList
            setSelected={handleSelection}
            data={data}
            style={styles.selectList}
            defaultOption={{ key: 'Student/Landlord', value: 'Student/Landlord' }}
            boxStyles={{ borderRadius: 20 }}
            inputStyles={{ fontSize: 20 }}
            dropdownTextStyles={{ fontSize: 20 }}
            search={false}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
container: {
    height: "auto",

    width: "70%",
    paddingBottom: "5%",
    marginLeft: "10%",
    top: -5,
    // borderRadius: 100,
},
selectList: {
    // height: 1000,
},
});

export default SignupPageDropDown;
