import { Canvas } from './Canvas';
import { Controls } from './Controls';
import { useCallback, useEffect, useState } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, KEYDOWN_EVENT, KEYUP_EVENT, SHIFT_KEY } from './constants';
import { StateContextProvider } from './state/StateContext'
import { Editor } from './Editor';
import { AppContainer } from './styled-components/AppContainer';


function App() {

  const [isMultiSelectActive, setIsMultiSelectActive] = useState(false)


  // This useEffect her ein the main App component to make the key handling 
  // for the multiselect (shift) key work whenever the app is active
  useEffect(() => {

    window.addEventListener(KEYDOWN_EVENT, downKeyPressHandler);
    window.addEventListener(KEYUP_EVENT, upKeyPressHandler);
    return () => {
      window.removeEventListener(KEYDOWN_EVENT, downKeyPressHandler);
      window.removeEventListener(KEYUP_EVENT, upKeyPressHandler);
    };
  });

  const downKeyPressHandler = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (key === SHIFT_KEY) {
      setIsMultiSelectActive(true);
    }
  }, []);

  const upKeyPressHandler = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (key === SHIFT_KEY) {
      setIsMultiSelectActive(false);
    }
  }, []);


  return (
    <StateContextProvider>
      <AppContainer>
        <Controls maxX={CANVAS_WIDTH} maxY={CANVAS_HEIGHT} />
        <Canvas height={`${CANVAS_HEIGHT}px`} width={`${CANVAS_WIDTH}px`} isMultiSelectActive={isMultiSelectActive} />
        <Editor />
      </AppContainer>
    </StateContextProvider>
  )
}

export default App;
