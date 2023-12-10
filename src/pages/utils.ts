const STYLE_TYPE = {
  bold: 'strong',
  italic: 'em',
  code: 'code'
};

function getDomByText(text: string, type: keyof typeof STYLE_TYPE) {
  const ele = STYLE_TYPE[type];
  return `<${ele}>${text}</${ele}>`;
}

export function textToTextHtml(descendant: any, isSimple = true) {
  const textHtml = descendant.map(item => {
    let text = item.children.reduce((htmlText, paragraph) => {
      let text = paragraph.text;
      for (const key of Object.keys(paragraph)) {
        if (STYLE_TYPE[key]) {
          text = getDomByText(text, key);
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
