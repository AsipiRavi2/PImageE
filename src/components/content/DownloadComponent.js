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
        html2canvas(document.getElementById("canvas"),{scale:2}).then(function(canvas) {
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
        position:'absolute',
        top:5,
        right:10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: '0 1rem 1rem 1rem',
        // border:'1px solid gray',
        // fontSize: '1rem',
        // boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .4)',
        maxWidth:170,
        minHeight:100
    },
    btn:{
        minWidth:150,
        margin:'.2rem',
        padding:'.5rem',
        border:'none',
        borderRadius:'1rem',
        // backgroundColor:'#21212',
        color:'white',
        fontSize:'1rem',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .7)',
        backgroundImage: 'linear-gradient(to bottom left, #48A192,#066152)'
    },
}