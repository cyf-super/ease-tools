import { textToTextHtml } from '@/pages/utils';
import { useState, useMemo, useCallback, ChangeEvent } from 'react';
import { Descendant } from 'slate';
import { toast } from 'sonner';
import { withReact } from 'slate-react';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

export interface Item {
  title: string;
  detail: string;
}

export function useTransform() {
  const [descendant, setDescendant] = useState<any[]>([
    {
      children: [{ text: '' }]
    }
  ]);
  const [textHtmlList, setTextHtmlList] = useState<Item[]>([]);
  const [textHtmlMode] = useState('simple');
  const [isTitle, setIsTitle] = useState(true);

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
    const textHtmlList = textToTextHtml(
      descendant,
      isTitle,
      textHtmlMode === 'simple'
    );
    setTextHtmlList(textHtmlList);
  }, [descendant, textHtmlMode, isTitle]);

  const editChange = useCallback(
    (val: Descendant[]) => {
      setDescendant(val);
    },
    [setDescendant]
  );

  const changeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTitle(e.target.checked);
  };

  const onCopy = async (text: string) => {
    if (!text) {
      toast.error('没有内容', {
        className: 'toast-error'
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success('已复制');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('复制失败');
    }
  };

  return {
    isTitle,
    descendant,
    textHtmlList,
    editor,
    changeCheckBox,
    editChange,
    onReset,
    onTransform,
    onCopy
  };
}
