import { textToTextHtml, validateAndCreateRegex } from '@/pages/utils';
import { useState, useMemo, useCallback, ChangeEvent, useRef } from 'react';
import { Descendant } from 'slate';
import { toast } from 'sonner';
import { withReact } from 'slate-react';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

export interface Item {
  name: string;
  image: string;
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
  const [title, setTtile] = useState('');

  const [regular, setRegular] = useState('/\\d+\\.\\s/');
  const [regularNum, setRegularNum] = useState(0);
  const [regularError, setRegularError] = useState(false);

  const headerInputRef = useRef<HTMLInputElement | null>(null);

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
      title,
      textHtmlMode === 'simple'
    );
    setTextHtmlList(textHtmlList);
  }, [descendant, textHtmlMode, isTitle, title]);

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

  const onDownload = () => {
    const blob = new Blob([JSON.stringify(textHtmlList, null, 2)], {
      type: 'text/plain'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (title || 'config') + '.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const onChangeRegular = (value: string) => {
    const res = validateAndCreateRegex(value);
    setRegular(value);
    setRegularError(res.valid);
  };

  return {
    isTitle,
    descendant,
    textHtmlList,
    editor,
    title,
    regular,
    regularNum,
    regularError,
    headerInputRef,
    onChangeRegular,
    setTtile,
    changeCheckBox,
    editChange,
    onReset,
    onTransform,
    onCopy,
    onDownload
  };
}
