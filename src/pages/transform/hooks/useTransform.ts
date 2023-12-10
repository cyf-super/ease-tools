import { textToTextHtml } from '@/pages/utils';
import { useState, useCallback, ChangeEvent } from 'react';
import { Descendant } from 'slate';

export function useTransform() {
  const [descendant, setDescendant] = useState<Descendant[]>([]);
  const [textHtml, setTextHtml] = useState('');
  const [textHtmlMode, settextHtmlMode] = useState('simple');

  const onReset = useCallback(() => {
    setDescendant([]);
  }, []);

  const onTransform = useCallback(() => {
    const textHtml = textToTextHtml(descendant, textHtmlMode === 'simple');
    setTextHtml(textHtml);
  }, [descendant, textHtmlMode]);

  const editChange = useCallback(
    val => {
      setDescendant(val);
    },
    [setDescendant]
  );

  const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextHtml(e.target.value);
  };

  return { textHtml, editChange, onReset, onTransform, changeTextArea };
}
