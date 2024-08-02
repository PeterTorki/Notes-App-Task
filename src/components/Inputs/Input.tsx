/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useTranslation} from 'react-i18next';
import MonoText from '../MonoText';
const {width} = Dimensions.get('window');

interface InputProps {
  title: string;
  styleInput?: any;
  stylesView?: any;
  color?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  iconName?: boolean | React.ReactNode;
  mt?: number;
  password?: boolean;
  keyboardType?: string;
  multiline?: boolean;
  largeTextInput?: boolean;
  inputHeight?: number;
  returnKeyType?: string;
  onSubmitEditing?: () => void;
  onPressSearch?: () => void;
  touch?: boolean;
}

function Input({
  title,
  styleInput,
  stylesView,
  color = '#000',
  value,
  onChangeText,
  iconName = false,
  mt = 0,
  password = false,
  keyboardType,
  multiline,
  largeTextInput,
  inputHeight,
  returnKeyType,
  onSubmitEditing,
  onPressSearch,
  touch = false,
}: InputProps) {
  const {isRtl} = useSelector((state: RootState) => state.Language);
  const [show, setShow] = useState(true);
  const {t} = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={{
        flexDirection: 'row',
        alignItems: largeTextInput ? 'flex-start' : 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderColor: colors.grey[300],
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 20,
        height: largeTextInput ? 100 : inputHeight ? inputHeight : 48,
        marginTop: mt,
        ...stylesView,
      }}>
      {password && (
        <Entypo
          style={{paddingHorizontal: 5}}
          name={show ? 'eye-with-line' : 'eye'}
          color={colors.grey[700]}
          size={18}
          onPress={() => setShow(!show)}
        />
      )}
      <View
        style={{
          flexDirection: isRtl ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        {!touch ? (
          <TextInput
            style={{
              textAlign: isRtl ? 'right' : 'left',
              width: password ? width * 0.63 : width * 0.8,
              color: color,
              height: '100%',
              textAlignVertical: largeTextInput ? 'top' : 'center',
              ...styleInput,
            }}
            value={value === 'Null' ? '' : value}
            placeholderTextColor={colors.grey[700]}
            placeholder={title === '' ? '' : t(title)}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={password ? show : false}
            multiline={multiline}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
        ) : (
          <TouchableOpacity
            onPress={onPressSearch}
            style={{
              textAlign: isRtl ? 'right' : 'left',
              width: password ? width * 0.63 : width * 0.72,
              color: color,
              ...styleInput,
            }}>
            <MonoText size={10} mh={10}>
              {t(title)}
            </MonoText>
          </TouchableOpacity>
        )}
        {iconName && (
          <View style={{width: width * 0.1, alignItems: 'center'}}>
            {iconName}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default Input;
