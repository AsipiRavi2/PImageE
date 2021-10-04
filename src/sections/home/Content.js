import React from 'react'
import DownloadComponent from '../../components/content/DownloadComponent'
import FilterComponent from '../../components/content/FilterComponent'
import PreviewComponent from '../../components/content/PreviewComponent'
import CanvasComponent from '../../components/content/CanvasComponent'

export default function Content() {

    return (
        <div style={styles.content}>
            <CanvasComponent />
            <div style={styles.activity}>
                <FilterComponent />
                <DownloadComponent />
            </div>
            <PreviewComponent />
        </div>
    )
}

const styles ={
    content:{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight:'200px',
        margin: '1rem',
        padding: '1rem',
        // border:'1px solid gray',
        fontSize: '1rem',
        // backgroundImage: 'linear-gradient(to bottom left, #48A192,#066152)'
        // backgroundColor:'gray',
        // overflow:'scroll'
    },
    activity:{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: '1rem',
        maxWidth:200
    }
}