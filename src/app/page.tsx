'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { ArrowRightLeft } from 'lucide-react'


export default function Translator() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [originalTranslatedText, setOriginalTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('spa_Latn')
  const [targetLang, setTargetLang] = useState('agr_Latn')
  const [isEditing, setIsEditing] = useState(false)
  const [editedTranslation, setEditedTranslation] = useState('')

  const API_URL = "http://44.222.212.53:8000;
  const TRANSLATE_URL= API_URL + "/translations/translate";
  const SAVE_URL=API_URL+"/translations/save";

  const APITranslate = async (text: string, from: string, to: string) => {
    console.log(API_URL)
    try {
      const response = await fetch(TRANSLATE_URL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_language: from,
          target_language: to,
          source_text: text,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.translated_text);
        return data.translated_text
      } else {
        throw new Error('Failed to fetch translation.');
      }
    } catch (error) {
      console.error('Error during translation: ', error);
      return 'Translation failed';
    }
  };

  const APISave = async (sourceText: string, originalTranslation: string, editedTranslation: string, srcLang: string, tgtLang: string) => {
    try {
      const response = await fetch(SAVE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_text: sourceText,
          original_translation: originalTranslation,
          edited_translation: editedTranslation,
          src_lang: srcLang,
          tgt_lang: tgtLang,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Translation saved:', data);
        return data;  // You can return any data you need
      } else {
        throw new Error('Failed to save translation.');
      }
    } catch (error) {
      console.error('Error saving translation: ', error);
      return null;  // Return null in case of error
    }
  };
  
  const handleTranslate = async () => {
    const result = await APITranslate(sourceText, sourceLang, targetLang)
    setTranslatedText(result)
    setOriginalTranslatedText(result)
    setEditedTranslation(result)
  }

  const switchLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
    setOriginalTranslatedText(sourceText)
    setEditedTranslation(sourceText)
  }

  const handleUpdate = () => {
    setTranslatedText(editedTranslation)
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      // Call the APISave function to save the translation
      const result = await APISave(
        sourceText,
        originalTranslatedText,
        editedTranslation,
        sourceLang,
        targetLang
      );
  
      if (result) {
        alert('Translation saved to database');
      } else {
        alert('Failed to save translation');
      }
    } catch (error) {
      console.error('Error saving translation: ', error);
      alert('An error occurred while saving the translation.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Spanish - Awajún Translator</h1>
      <div className="flex justify-between items-center">
        <Select value={sourceLang} onValueChange={setSourceLang}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Source Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spa_Latn">Spanish</SelectItem>
            <SelectItem value="agr_Latn">Awajún</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={switchLanguages}>
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
        <Select value={targetLang} onValueChange={setTargetLang}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Target Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spa_Latn">Spanish</SelectItem>
            <SelectItem value="agr_Latn">Awajún</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        placeholder="Enter text to translate"
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
        rows={5}
      />
      <Button onClick={handleTranslate} className="w-full">Translate</Button>
      <Textarea
        placeholder="Translation will appear here"
        value={isEditing ? editedTranslation : translatedText}
        onChange={(e) => setEditedTranslation(e.target.value)}
        readOnly={!isEditing}
        rows={5}
      />
      <div className="flex justify-between mt-4">
        <div className="space-x-2">
          <Button
            onClick={() => {
              if (isEditing) {
                setIsEditing(false)
                setEditedTranslation(translatedText)
              } else {
                setIsEditing(true)
              }
            }}
            disabled={!translatedText}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          {isEditing && (
            <Button
              onClick={handleUpdate}
              disabled={editedTranslation === translatedText}
            >
              Update
            </Button>
          )}
        </div>
        <Button
          onClick={handleSave}
          disabled={!translatedText}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
