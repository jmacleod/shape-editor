import { useContext } from 'react'
import { StateContext } from './state/StateContext';
import { EditorContainer } from './styled-components/EditorContainer';
import { EditPanel } from './EditPanel';
import { Shape } from './types';


export const Editor = () => {
    const { state, dispatch } = useContext(StateContext);

    const editPanels = state.shapes
        .filter((shape: Shape) => shape.selected)
        .map((shape: Shape) => {
            return <EditPanel
                shape={shape}
                dispatch={dispatch}
                key={shape.id}
            />
        })
    return (
        <EditorContainer>
            {editPanels}
        </EditorContainer>
    )
}
