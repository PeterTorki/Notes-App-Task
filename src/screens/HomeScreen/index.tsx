// HomeScreen.tsx
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {colors} from '../../../constants/Colors';
import MonoText from '../../components/MonoText';
import ModalCustom from '../../components/ModalCustom';
import Input from '../../components/Inputs/Input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {editNote, setNote} from '../../redux/Notes';
import {INote} from '../../interfaces';
import NoteItem from '../../components/NoteItem';
import ColorsList from '../../components/ColorsList';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from '../../redux/Language';

const HomeScreen = () => {
  const notes = useSelector((state: RootState) => state.NotesList.notesList);
  const language = useSelector((state: RootState) => state.Language.lang);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {t, i18n} = useTranslation();

  const changeLang = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    dispatch(changeLanguage(newLang));
  };

  const [newNote, setNewNote] = useState({
    text: '',
    selectedColor: colors.primary,
  });

  const [editingNote, setEditingNote] = useState<INote | null>(null);

  const handleOpenModal = (note: INote | null = null) => {
    if (note) {
      setIsEditing(true);
      setEditingNote(note);
      setNewNote(note);
    } else {
      setIsEditing(false);
      setNewNote({
        text: '',
        selectedColor: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    setShowModal(false);
    if (isEditing && editingNote) {
      dispatch(
        editNote({
          id: editingNote.id,
          changes: {
            text: newNote.text,
            selectedColor: newNote.selectedColor,
          },
        }),
      );
    } else {
      if (!newNote.text) {
        return;
      }
      dispatch(
        setNote({
          text: newNote.text,
          selectedColor: newNote.selectedColor,
        }),
      );
    }
    setNewNote({
      text: '',
      selectedColor: '',
    });
    setIsEditing(false);
    setEditingNote(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeLang}>
        <MonoText size={20} color={colors.black}>
          {t('changeLanguage')}
        </MonoText>
      </TouchableOpacity>
      <Input
        title={'searchHere'}
        value={searchTerm}
        onChangeText={(val: any) => setSearchTerm(val)}
        stylesView={styles.basicInput}
        mt={10}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          searchTerm
            ? notes.filter((note: {text: string}) =>
                note.text.toLowerCase().includes(searchTerm.toLowerCase()),
              )
            : notes
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NoteItem note={item} onEdit={handleOpenModal} />
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <ModalCustom
        visible={showModal}
        onPressCancel={() => setShowModal(false)}
        submitText={isEditing ? t('editNote') : t('addNote')}
        cancelText={t('cancel')}
        onPressSubmit={handleSubmit}
        modalStyle={{
          backgroundColor: newNote.selectedColor || colors.primary,
        }}
        submitStyle={styles.submitStyle}
        upper={
          <MonoText
            size={20}
            color={colors.black}
            bold
            style={styles.modalHeader}>
            {isEditing ? t('editNote') : t('addNote')}
          </MonoText>
        }
        child={
          <View style={styles.modalChild}>
            <Input
              title={t('note')}
              value={newNote.text}
              onChangeText={(val: any) =>
                setNewNote(prev => ({...prev, text: val}))
              }
              largeTextInput
              multiline
              inputHeight={200}
              stylesView={{
                ...styles.inputView,
              }}
            />
            <ColorsList
              colorPalette={['#FFCEEB', '#FEF1D1', '#D7F8FF', '#CEC5FA']}
              selectedColor={newNote.selectedColor}
              onPress={color => {
                setNewNote(prev => ({...prev, selectedColor: color}));
              }}
            />
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => handleOpenModal()}
        style={styles.modalStyle}>
        <MaterialIcons name="add-circle" size={32} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  basicInput: {
    marginBottom: 16,
    borderColor: colors.black,
    borderWidth: 2,
  },
  contentContainerStyle: {
    paddingBottom: 28,
  },
  modalStyle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.white,
    borderRadius: 32,
    zIndex: 1,
  },
  modalHeader: {
    marginVertical: 16,
  },
  modalChild: {
    width: '100%',
    borderRadius: 8,
    gap: 16,
  },
  inputView: {
    borderColor: colors.black,
  },
  iconStyle: {
    marginHorizontal: 0,
  },
  submitStyle: {
    backgroundColor: colors.success,
  },
});

export default HomeScreen;
