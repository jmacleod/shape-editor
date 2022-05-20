import React, { useReducer } from 'react';
import { Canvas } from './Canvas';
import { Controls } from './Controls';
import { useCallback, useEffect, useState } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, KEYDOWN_EVENT, KEYUP_EVENT, SHIFT_KEY } from './constants';
import { ShapeContextProvider } from './shapeContext'
import { Editor } from './Editor';


function App() {

  const [isMultiSelectActive, setIsMultiSelectActive] = useState(false)

  useEffect(() => {

    window.addEventListener(KEYDOWN_EVENT, downKeyPressHandler);
    window.addEventListener(KEYUP_EVENT, upKeyPressHandler);
    return () => {
      window.removeEventListener(KEYDOWN_EVENT, downKeyPressHandler);
      window.removeEventListener(KEYUP_EVENT, upKeyPressHandler);
    };
  }, []);

  const downKeyPressHandler = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (key == SHIFT_KEY) {
      setIsMultiSelectActive(true);
    }
  }, []);

  const upKeyPressHandler = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    console.log(key)
    if (key == SHIFT_KEY) {
      setIsMultiSelectActive(false);
    }
  }, []);


  return (
    <ShapeContextProvider>
      <div style={{
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        maxHeight: CANVAS_HEIGHT
      }}>
        <Controls maxX={CANVAS_WIDTH} maxY={CANVAS_HEIGHT} />
        <Canvas height={`${CANVAS_HEIGHT}px`} width={`${CANVAS_WIDTH}px`} isMultiSelectActive={isMultiSelectActive} />
        <Editor />
      </div>
    </ShapeContextProvider>
  )
}

export default App;
