import { textToTextHtml } from '@/pages/utils';
import { useState, useCallback, ChangeEvent } from 'react';
import { Descendant } from 'slate';
import { toast } from 'sonner';

export function useTransform() {
  const [descendant, setDescendant] = useState<Descendant[]>([]);
  const [textHtml, setTextHtml] = useState('');
  const [textHtmlMode] = useState('simple');

  const onReset = useCallback(() => {
    setDescendant([]);
  }, []);

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
    console.log('11111');
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

  return { textHtml, editChange, onReset, onTransform, changeTextArea, onCopy };
}
