// ColorsList.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';

const ColorsList = ({
  colorPalette,
  selectedColor,
  onPress,
}: {
  colorPalette: string[];
  selectedColor: string;
  onPress: (color: string) => void;
}) => {
  const styles = StyleSheet.create({
    colorItem: {
      width: 24,
      height: 24,
      borderRadius: 8,
      borderColor: colors.black,
    },
    container: {
      flexDirection: 'row',
      gap: 8,
    },
  });

  return (
    <View style={styles.container}>
      {colorPalette.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.colorItem,
            backgroundColor: color,
            borderWidth: color === selectedColor ? 2 : 0,
          }}
          onPress={() => onPress(color)}
        />
      ))}
    </View>
  );
};

export default ColorsList;
