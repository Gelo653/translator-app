'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { ArrowRightLeft } from 'lucide-react'

// Mock translation function (replace with actual API call in production)
const mockTranslate = (text: string, from: string, to: string) => {
  // This is a very basic mock. In reality, you'd call an API here.
  if (from === 'spa_Latn' && to === 'agr_Latn') {
    return `${text}`
  } else if (from === 'agr_Latn' && to === 'spa_Latn') {
    return `${text}`
  }
  return text
}

export default function Translator() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [originalTranslatedText, setOriginalTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('spa_Latn')
  const [targetLang, setTargetLang] = useState('agr_Latn')
  const [isEditing, setIsEditing] = useState(false)
  const [editedTranslation, setEditedTranslation] = useState('')

  const handleTranslate = () => {
    const result = mockTranslate(sourceText, sourceLang, targetLang)
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

  const handleSave = () => {
    // Here you would typically call an API to save the translation to the database
    console.log('Saving to database:', {
      sourceText,
      originalTranslation: originalTranslatedText,
      currentTranslation: translatedText,
      editedTranslation: editedTranslation
    })
    // For now, we'll just log the data
    alert('Translation saved to database')
  }

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