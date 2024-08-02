// NoteItem.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../constants/Colors';
import MonoText from './MonoText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {deleteNote, editNote} from '../redux/Notes';
import ColorsList from './ColorsList';
import {INote} from '../interfaces';
import getCreatedAt from '../utils/getCreatedAt';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import checkTextDirection from '../utils/checkTextDirection';

const NoteItem: React.FC<{note: INote; onEdit: (note: INote) => void}> =
  React.memo(({note, onEdit}) => {
    const {isRtl} = useSelector((state: RootState) => state.Language);
    const dispatch = useDispatch();

    const createdAt = getCreatedAt(note.createdAt);

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: note.selectedColor || colors.primary,
        }}>
        <MonoText
          size={20}
          color={colors.black}
          mh={12}
          style={{
            textAlign: checkTextDirection(note.text) ? 'right' : 'left',
          }}>
          {note.text}
        </MonoText>
        <View
          style={{
            ...styles.footer,
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}>
          <MonoText size={16} color={colors.grey[700]}>
            {createdAt}
          </MonoText>
          <View style={styles.rightContainer}>
            <ColorsList
              colorPalette={['#FFCEEB', '#FEF1D1', '#D7F8FF', '#CEC5FA']}
              selectedColor={note.selectedColor}
              onPress={(color: any) =>
                dispatch(
                  editNote({
                    id: note.id,
                    changes: {
                      selectedColor: color,
                    },
                  }),
                )
              }
            />
            <View style={styles.iconButton}>
              <TouchableOpacity onPress={() => onEdit(note)}>
                <Entypo name="edit" size={24} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteNote({id: note.id}));
                }}>
                <FontAwesome name="trash" size={24} color="#BD3630" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    gap: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    flexDirection: 'row',
    gap: 16,
  },
});
export default NoteItem;
