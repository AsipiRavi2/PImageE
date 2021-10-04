import React from 'react'

export default function Footing() {
    return (
        <div style={styles.title}>
            Made with <span style={styles.span_text}>&#10084;</span> by IVAR
        </div>
    )
}

const styles={
    title:{
        color:'gray',
        fontSize: '1.5rem',
        margin: '.5rem'
    },
    span_text:{
        color:'red',
        fontSize: '1.8rem',
    }
}