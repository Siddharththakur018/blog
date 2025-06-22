import React from 'react'
import { Toaster } from 'react-hot-toast'

function Modal() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}

export default Modal