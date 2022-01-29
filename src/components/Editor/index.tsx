import { Editor as TextEditor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline
} from 'react-icons/fa';
import './styles.scss';

type HeaderType = 'header-one' | 'header-two' | 'header-three';
type StyleType = 'BOLD' | 'ITALIC' | 'UNDERLINE';
type BlockType = 'unordered-list-item' | 'ordered-list-item';
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
    { string: 'BOLD', icon: <FaBold /> },
    { string: 'ITALIC', icon: <FaItalic /> },
    { string: 'UNDERLINE', icon: <FaUnderline /> }
  ];

  const headerTools = [
    { string: 'Header 1', value: 'header-one' },
    { string: 'Header 2', value: 'header-two' },
    { string: 'Header 3', value: 'header-three' }
  ];

  const blockTools = [
    { string: 'unordered-list-item', icon: <FaListUl /> },
    { string: 'ordered-list-item', icon: <FaListOl /> }
  ];

  const alignTools = [
    { string: 'left', icon: <FaAlignLeft /> },
    { string: 'center', icon: <FaAlignCenter /> },
    { string: 'right', icon: <FaAlignRight /> }
  ];

  const handleChange = (state: any) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command: string, state: any) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleStyleTextEdit = (type: StyleType) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, type));
  };

  const handleBlockTextEdit = (type: BlockType | HeaderType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const isStyleActive = (styleType: StyleType) => {
    return editorState.getCurrentInlineStyle().has(styleType);
  };

  return (
    <div id="editor-container">
      <div id="editor-tools">
        <select
          name="header"
          onChange={(event) => handleBlockTextEdit(event.target.value as BlockType)}
        >
          <option value="">Paragraph</option>
          {headerTools.map(({ string, value }) => (
            <option
              key={value}
              value={value}
            >
              {string}
            </option>
          ))}
        </select>

        <div id="tools-divider" />

        {styleTools.map(({ string, icon }) => {
          const toolString = string as StyleType;
          return (
            <button
              type="button"
              key={string}
              className={isStyleActive(string as StyleType) ? 'active' : ''}
              onClick={() => handleStyleTextEdit(toolString)}
            >
              {icon}
            </button>
          );
        })}

        <div id="tools-divider" />

        {alignTools.map(({ string, icon }) => {
          return (
            <button
              type="button"
              key={string}
              className={string === textAlignment ? 'active' : ''}
              onClick={() => setTextAlignment(string as AlignType)}
            >
              {icon}
            </button>
          );
        })}

        <div id="tools-divider" />

        {blockTools.map(({ string, icon }) => {
          return (
            <button
              type="button"
              key={string}
              onClick={() => handleBlockTextEdit(string as BlockType)}
            >
              {icon}
            </button>
          );
        })}
      </div>
      <div id="editor-content">
        <TextEditor
          ref={ref}
          onChange={handleChange}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          textAlignment={textAlignment}
        />
      </div>
    </div>
  );
};

export default Editor;
