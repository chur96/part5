import {useState, forwardRef, useImperativeHandle} from 'react'

const Togglable = forwardRef((props, refs) => {

    const [visible, setVisible] = useState(false)

    const showIfVisible = {'display': visible ? '' : 'none'}
    const hideIfVisible = {'display': visible ? 'none' : ''} 
     
    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisible
        }
    })

    return(
        <div>
            <div style={hideIfVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>

            <div style={showIfVisible}>
                {props.children}
                <button onClick={toggleVisible}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable