import html2canvas from 'html2canvas';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { previewImage } from '../../features/preview/previewSlice'

export default function DownloadComponent() {

    const backgroundImage = useSelector(state => state.background.url)

    function previewImg() {
        html2canvas(document.getElementById("canvas")).then(function(canvas) {
            document.getElementById("preview_Image").innerHTML="";
            document.getElementById("preview_Image").appendChild(canvas);
        });
        dispatch(previewImage())
    }
    
    function downloadImg(){
        html2canvas(document.getElementById("canvas"),{scale:1}).then(function(canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = "download.png";
            link.click()
        });
    }

    const dispatch = useDispatch()
    return (
        <>
        {backgroundImage
        &&
        <div style={styles.download}>
            <button style={styles.btn} onClick={previewImg}> Preview </button>
            <button style={styles.btn} onClick={downloadImg}> Download </button>
        </div>
        }
        </>
    )
}

const styles ={
    download:{
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: '1rem 1rem 1rem 1rem',
        minWidth:170,
        minHeight:100,

    },
    btn:{
        minWidth:150,
        margin:'.2rem',
        padding:'.2rem .5rem .2rem .5rem',
        border:'none',
        borderRadius:'.2rem',
        // backgroundColor:'white',
        color:'cyan',
        fontSize:'1rem',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .5)',
        backgroundImage: 'linear-gradient(to bottom left, #066152, #48A192)',
        cursor:'pointer'
    },
}