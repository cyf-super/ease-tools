import { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'sonner';

export function useTransform() {
  const [json, setJson] = useState('');
  const [stringjson, setStringJson] = useState('');

  const changeJson = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJson(e.target.value);
    console.log('🚀 ~ changeJson ~ e.target.value:', typeof e.target.value);
  };
  const changeStringjson = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStringJson(e.target.value);
  };

  useEffect(() => {
    try {
      if (!json) {
        setStringJson('');
        return;
      }
      const formatJson = new Function('return' + json)();
      const str = JSON.stringify(formatJson);
      const strJson = str.replaceAll('"', '\\"');
      setStringJson(strJson);
    } catch (e) {}
  }, [json]);

  const onReset = () => {
    setJson('');
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(stringjson);
    toast.success('已复制');
  };

  return {
    json,
    stringjson,
    onCopy,
    onReset,
    changeJson,
    changeStringjson
  };
}
