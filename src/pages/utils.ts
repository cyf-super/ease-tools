const STYLE_TYPE = {
  bold: 'strong',
  italic: 'em',
  code: 'code'
};

function getDomByText(text: string, type: keyof typeof STYLE_TYPE) {
  const ele = STYLE_TYPE[type];
  return `<${ele}>${text}</${ele}>`;
}

export function textToTextHtml(descendant: unknown, isSimple = true) {
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

    if (isSimple) text += '<br /> ';
    else text = `<p>${text}</p>`;
    return text;
  });

  return textHtml.join('');
}
