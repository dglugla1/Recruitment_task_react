import * as React from 'react';
import './style.css';
import Example from './example.json';

function TextTile({ text }) {
  return (
    <div
      className="text-tile"
      id={text.elementKey}
      style={{ backgroundColor: text.color }}
    >
      <h2>{text.title}</h2>
      <p>{text.text}</p>
    </div>
  );
}

function ImageTile({ image }) {
  return (
    <div className="image-tile">
      <img className="image" id={image.elementKey} src={image.source} />
    </div>
  );
}

function ButtonTile({ button }) {
  function handleClick() {
    if (button.action.type === 'update') {
      if ('color' in button.action.value) {
        document.getElementById(
          button.action.referenceElementKey
        ).style.backgroundColor = button.action.value.color;
      } else if ('source' in button.action.value) {
        document
          .getElementById(button.action.referenceElementKey)
          .setAttribute('src', button.action.value.source);
      }
    } else {
      console.log('more actions');
    }
  }

  return (
    <div className="button-tile">
      <button className="button" id={button.elementKey} onClick={handleClick}>
        {button.text}
      </button>
    </div>
  );
}

function HorizontalSplitter({ elements }) {
  let content = elements.map((element) =>
    element.type === 'verticalSplitter' ? (
      <VerticalSplitter elements={element.elements} />
    ) : element.type === 'horizontalSplitter' ? (
      <HorizontalSplitter elements={element.elements} />
    ) : element.type === 'imageTile' ? (
      <ImageTile image={element} />
    ) : element.type === 'buttonTile' ? (
      <ButtonTile button={element} />
    ) : element.type === 'textTile' ? (
      <TextTile text={element} />
    ) : (
      console.log('element doesn not exist')
    )
  );
  return (
    <div id={elements.elementKey} className="horizontal">
      {content}
    </div>
  );
}

function VerticalSplitter({ elements }) {
  let content = elements.map((element) =>
    element.type === 'verticalSplitter' ? (
      <VerticalSplitter elements={element.elements} />
    ) : element.type === 'horizontalSplitter' ? (
      <HorizontalSplitter elements={element.elements} />
    ) : element.type === 'imageTile' ? (
      <ImageTile image={element} />
    ) : element.type === 'buttonTile' ? (
      <ButtonTile button={element} />
    ) : element.type === 'textTile' ? (
      <TextTile text={element} />
    ) : (
      <div>nie ma takiego elementu</div>
    )
  );
  return (
    <div id={elements.elementKey} className="vertical">
      {content}
    </div>
  );
}

export default function App() {
  return (
    <div className="main">
      <h1>{Example.title}</h1>
      {Example.rootElement.type === 'verticalSplitter' ? (
        <div className="content">
          <VerticalSplitter elements={Example.rootElement.elements} />
        </div>
      ) : Example.rootElement.type === 'horizontalSplitter' ? (
        <div className="content">
          <HorizontalSplitter elements={Example.rootElement.elements} />
        </div>
      ) : (
        console.log('no such element')
      )}
    </div>
  );
}
