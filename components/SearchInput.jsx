import { icons, images } from "@/constants";
import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";


const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (


      <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder='Search for a video topic'
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword} />

        {title === 'Password' && (
            <TouchableOpacity>
                <Image 
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain" />
            </TouchableOpacity>
        )}
      </View>
  );
};

export default SearchInput;
