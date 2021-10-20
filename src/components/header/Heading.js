import React from 'react'

export default function Heading() {
    return (
        <div style={styles.Title}>
            Product Image Editor
        </div>
    )
}

const styles={
    Title:{
        color:'gray',
        fontSize: '2rem',
        margin: '.5rem',
    }
}