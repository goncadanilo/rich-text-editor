import { Editor as TextEditor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline
} from 'react-icons/fa';
import './styles.scss';

type StyleType = 'BOLD' | 'ITALIC' | 'UNDERLINE';
type BlockType = 'unordered-list-item' | 'ordered-list-item' | 'header-one';
type AlignType = 'right' | 'left' | 'center';

const Editor: React.FC = () => {
  const ref = useRef<TextEditor>(null);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const [textAlignment, setTextAlignment] = useState<AlignType>('left');

  useEffect(() => {
    ref?.current?.focus();
  });

  const styleTools = [
    { type: 'BOLD', icon: <FaBold /> },
    { type: 'ITALIC', icon: <FaItalic /> },
    { type: 'UNDERLINE', icon: <FaUnderline /> }
  ];

  const blockTools = [
    { type: 'header-one', icon: <FaHeading /> },
    { type: 'unordered-list-item', icon: <FaListUl /> },
    { type: 'ordered-list-item', icon: <FaListOl /> }
  ];

  const alignTools = [
    { type: 'left', icon: <FaAlignLeft /> },
    { type: 'center', icon: <FaAlignCenter /> },
    { type: 'right', icon: <FaAlignRight /> }
  ];

  const handleKeyCommand = (command: string, state: any) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleTextEdit = (
    type: StyleType | BlockType,
    isBlockType?: boolean
  ) => {
    if (isBlockType) {
      setEditorState(RichUtils.toggleBlockType(editorState, type));
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    }
  };

  const isStyleActive = (type: StyleType) => {
    return editorState.getCurrentInlineStyle().has(type);
  };

  return (
    <div id="editor-container">
      <div id="editor-tools">
        {blockTools.map(({ type, icon }) => {
          return (
            <button
              type="button"
              key={type}
              onClick={() => handleTextEdit(type as BlockType, true)}
            >
              {icon}
            </button>
          );
        })}

        <div id="tools-divider" />

        {styleTools.map(({ type, icon }) => {
          return (
            <button
              type="button"
              key={type}
              className={isStyleActive(type as StyleType) ? 'active' : ''}
              onClick={() => handleTextEdit(type as StyleType)}
            >
              {icon}
            </button>
          );
        })}

        <div id="tools-divider" />

        {alignTools.map(({ type, icon }) => {
          return (
            <button
              type="button"
              key={type}
              className={type === textAlignment ? 'active' : ''}
              onClick={() => setTextAlignment(type as AlignType)}
            >
              {icon}
            </button>
          );
        })}
      </div>
      <div id="editor-content">
        <TextEditor
          ref={ref}
          onChange={setEditorState}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          textAlignment={textAlignment}
        />
      </div>
    </div>
  );
};

export default Editor;
