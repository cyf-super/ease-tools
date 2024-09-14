import { Item } from './text-transform/hooks/useTransform';

const STYLE_TYPE = {
  bold: 'strong',
  italic: 'em',
  code: 'code'
};

function getDomByText(text: string, type: keyof typeof STYLE_TYPE) {
  const ele = STYLE_TYPE[type];
  return `<${ele}>${text}</${ele}>`;
}

export function textToTextHtml(
  descendant: unknown,
  isTitle: boolean,
  title: string,
  isSimple = true
) {
  const textHtml = (descendant as Descendant[]).map(item => {
    let text = item.children.reduce((htmlText, paragraph) => {
      let text = paragraph.text;
      for (const key of Object.keys(paragraph)) {
        if (STYLE_TYPE[key as keyof typeof STYLE_TYPE]) {
          text = getDomByText(text, key as keyof typeof STYLE_TYPE);
        }
      }
      return (htmlText += text), htmlText;
    }, '');

    if (text === '') {
      return (text = '<br />'), text;
    }

    if (isSimple) text += '<br />';
    else text = `<p>${text}</p>`;
    return text;
  });

  const htmlArr: Item[] = [];
  let item = '';
  let previous = false;
  textHtml.forEach(text => {
    if (text === '[图片]<br />') {
      item && htmlArr.push(getHtmlObj(item, isTitle, title));
      item = '';
      previous = true;
    } else if (text === '<br />' && previous) {
      return;
    } else {
      item += text;
      previous = false;
    }
  });
  if (!previous) {
    htmlArr.push(getHtmlObj(item, isTitle, title));
  }
  return htmlArr;
}

function getHtmlObj(textHtml: string, isTitle: boolean, title: string) {
  if (isTitle) {
    const arr = textHtml.split('<br />');
    const name = arr.shift()!;
    const image = `/hh-sh/img/list/${title || 'config'}/${name}.jpg`;
    const detail = arr.join('<br />');
    return {
      name,
      image,
      detail
    };
  }
  return {
    name: '',
    image: '',
    detail: textHtml
  };
}

// 校验正则表达式
export function validateAndCreateRegex(pattern: string) {
  try {
    const regex = new RegExp(pattern);
    return { valid: true, regex: regex };
  } catch (e: any) {
    return { valid: false, error: e.message };
  }
}
