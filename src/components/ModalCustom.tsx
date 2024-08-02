import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import {colors} from '../../constants/Colors';

const {width} = Dimensions.get('window');

interface ModalCustomProps {
  submitText?: string;
  onPressSubmit?: () => void;
  cancelText?: string;
  onPressCancel?: () => void;
  child?: React.ReactNode;
  style?: ViewStyle;
  modalStyle?: ViewStyle;
  submitStyle?: ViewStyle;
  submitTextStyle?: TextStyle;
  upper?: React.ReactNode;
  visible?: boolean;
  noFooter?: boolean;
}

const ModalCustom = ({
  submitText,
  onPressSubmit,
  cancelText = 'cancel',
  onPressCancel = () => {},
  child,
  modalStyle,
  submitStyle,
  submitTextStyle,
  upper,
  visible,
  noFooter = false,
}: ModalCustomProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      style={styles.container}
      animationType="slide">
      <TouchableWithoutFeedback onPress={onPressCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalViewStyle, modalStyle]}>
              {upper}

              {child}
              {!noFooter && (
                <View style={styles.footer}>
                  {cancelText && (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {backgroundColor: 'transparent', borderWidth: 1},
                      ]}
                      onPress={onPressCancel}>
                      <Text style={styles.cancelText}>{cancelText}</Text>
                    </TouchableOpacity>
                  )}
                  {submitText && (
                    <TouchableOpacity
                      style={[styles.button, submitStyle]}
                      onPress={onPressSubmit}>
                      <Text style={[styles.submitText, submitTextStyle]}>
                        {submitText}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(60, 61, 62, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
    zIndex: 1,
  },
  modalViewStyle: {
    width: width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    width: '35%',
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  cancelText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#474746',
  },
  submitText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});

export default ModalCustom;
