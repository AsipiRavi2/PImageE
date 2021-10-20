import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewImage } from '../../features/preview/previewSlice';

export default function PreviewComponent( ) {
    const preview = useSelector(state => state.preview.display) === 'none' ? 'none' : 'flex'  ;
    const dispatch = useDispatch() ;

    const styles = {
        preview:{
            position:'absolute',
            zIndex:10,
            top:'0',
            left:'auto',
            margin:'1rem',
            padding:'1rem',
            display: preview,
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .4)',
            minWidth:300,
            backgroundImage: 'linear-gradient(to bottom left, #48A192,#066152)'
        },
        close_btn:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
        },
        btn:{
            position:'absolute',
            top:10,
            right:10,
            margin:'.2rem',
            padding:'.5rem',
            backgroundColor:'transparent',
            border:'none',
            fontSize:'1rem',
        },
        preview_image:{
            position:'relative',
            top:20,
            margin: '1rem',
            border:'1px solid gray',
            fontSize: '1rem',
            boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .4)',
        }
    }


    return (
        <div style={styles.preview} id="preview">
            <div style={styles.close_btn}> 
                <button style={styles.btn} onClick={()=>dispatch(previewImage())}>&#10006;</button>
            </div>
            <div style={styles.preview_image} id="preview_Image">Preview Image</div>
        </div>
    )
}

