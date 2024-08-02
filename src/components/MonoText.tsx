import {Text, Platform} from 'react-native';
import React from 'react';
import {colors} from '../../constants/Colors';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';

export default function MonoText(props: any) {
  const {isRtl} = useSelector((state: RootState) => state.Language);
  const size =
    Platform.OS == 'android' ? Number(props.size) - 2 || 12 : props.size;
  return (
    <Text
      {...props}
      style={[
        {
          fontWeight: props.bold ? 'bold' : 'normal',
          fontSize: size,
          color: props.color || colors.white,
          textAlign: props.center ? 'center' : isRtl ? 'right' : 'left',
          marginTop: props.top,
          marginHorizontal: props.mh,
          lineHeight: props.lineHeight,
        },
        props.style,
      ]}
    />
  );
}
