import { textToTextHtml } from '@/pages/utils';
import { useState, useMemo, useCallback, ChangeEvent } from 'react';
import { Descendant } from 'slate';
import { toast } from 'sonner';
import { withReact } from 'slate-react';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

export function useTransform() {
  const [descendant, setDescendant] = useState<any[]>([
    {
      children: [{ text: '' }]
    }
  ]);
  const [textHtml, setTextHtml] = useState('');
  const [textHtmlMode] = useState('simple');

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  function onReset() {
    editor.children.map(_ => {
      Transforms.delete(editor, { at: [0] });
    });
    // reset init
    editor.children = [
      {
        children: [{ text: '' }]
      }
    ];
    setDescendant(editor.children);
  }

  const onTransform = useCallback(() => {
    const textHtml = textToTextHtml(descendant, textHtmlMode === 'simple');
    setTextHtml(textHtml);
  }, [descendant, textHtmlMode]);

  const editChange = useCallback(
    (val: Descendant[]) => {
      setDescendant(val);
    },
    [setDescendant]
  );

  const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextHtml(e.target.value);
  };

  const onCopy = async () => {
    if (!textHtml) {
      toast.error('没有内容', {
        className: 'toast-error'
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(textHtml);
      toast.success('已复制');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('复制失败');
    }
  };

  return {
    descendant,
    textHtml,
    editor,
    editChange,
    onReset,
    onTransform,
    changeTextArea,
    onCopy
  };
}
