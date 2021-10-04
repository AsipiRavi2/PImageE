import React, { useState } from 'react'
// import sticker from '../../assets/sticker.png'
// import bg from '../../assets/bedroom.jpeg'
// import bg1 from '../../assets/living.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { addBackground } from '../../features/background/backgroundSlice';
import { addSticker, changeDimensions, deleteSticker } from '../../features/sticker/stickerSlice';

export default function FilterComponent() {

    const backgroundImage = useSelector(state => state.background.url)
    const stickersList =  useSelector(state => state.stickers.stickersList)
    const stickersListLength = stickersList.length
    // const backgroundImage = null
    const dispatch = useDispatch()

    const [selectedSticker, setSelectedSticker ] = useState(null)

    function chooseStickerFile(){
        document.getElementById("sticker_file").click()
    }

    function onStickerFileChange(event)
    {   
        if (event.target.files && event.target.files[0]) {
            if(event.target.files[0].size/1024/1024<=5){
                const stickerDetails = {
                    url:URL.createObjectURL(event.target.files[0]),
                    width:20,
                    height:20,
                    radius: 0,
                    opacity: 1,
                    rotation: 0,
                }
                dispatch(addSticker(stickerDetails))
            }
            else{
                alert('files size <3MB' )
            }
        }
    }

    function chooseBackgroundFile(){
        document.getElementById("background_file").click()
    }

    function onBackgroundFileChange(event)
    {   
        if (event.target.files && event.target.files[0]) {
            if(event.target.files[0].size/1024/1024<=10){
                dispatch(addBackground(URL.createObjectURL(event.target.files[0])))
            }
            else{
                alert('files size <10MB' )
            }
        }
    }

    function selectSticker(i){

        var filterStickerDiv = document.getElementById("filter_sticker_id_".concat(i))
        filterStickerDiv.style.border = '1px solid black';

        // var stickerDiv = document.getElementById("sticker_div_id_".concat(i))
        // stickerDiv.style.border = '2px solid black';

        for (let j=0; j<stickersListLength; j++){
            if(i!==j){
                document.getElementById("filter_sticker_id_".concat(j)).style.border = 'none';
                // document.getElementById("sticker_div_id_".concat(j)).style.border = 'none';
            }
        }
        setSelectedSticker(i)
    }

    function changeStickerDimensions(e){
        dispatch(changeDimensions({'index':selectedSticker,'name':e.target.name,'value':e.target.value}))
    }

    function deleteSelectedSticker(){
        dispatch(deleteSticker({'index':selectedSticker}))
        setSelectedSticker(null)
    }


    return (
        <div style={styles.filters}>

            { backgroundImage 
            ? 
                <div style={styles.background_div}>
                    <img src={backgroundImage} alt="background_img" style={styles.background_img}/>
                    <div style={styles.background_text_overlay}>
                        <input type="file" style={{display:"none"}} id="background_file" onChange={onBackgroundFileChange}></input>
                        <div onClick={chooseBackgroundFile}> &#x1F58A; change </div>
                    </div>
                </div>
            :
                <div style={styles.add_background} > 
                    <input type="file" style={{display:"none"}} id="background_file" onChange={onBackgroundFileChange}></input>
                    <div onClick={chooseBackgroundFile}> Choose Background Image </div>
                </div>
            }

            { backgroundImage
            &&
            <div style={styles.stickers_div}>
                {stickersList.length>0
                && 
                stickersList.map((sticker,i)=>
                    <div style={styles.sticker_div} key={i} id={"filter_sticker_id_".concat(i)}>
                        <img src={sticker.url} alt="sticker" style={styles.sticker} onClick={()=>selectSticker(i)}/>
                    </div>

                    )
                }

                <div style={styles.sticker_add_div} > 
                    <div>
                        <input type="file" style={{display:"none"}} id="sticker_file" onChange={onStickerFileChange}></input>
                        <div onClick={chooseStickerFile}> 
                            add sticker
                        </div>
                    </div>
                </div>

                {stickersList.length>0
                &&
                    <div>select sticker to edit</div>
                }
            </div>
            }
            { backgroundImage
            &&
            selectedSticker!=null
            &&
            <div>
                <div style={styles.control_div}>
                    <label labelfor="sticker-width" style={styles.label}>Width</label>
                    <input style={styles.input} type="range" min="1" max="50" step="1" id="sticker_width" name="width" value={stickersList[selectedSticker].width} onChange={changeStickerDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="sticker-height" style={styles.label}>Height</label>
                    <input style={styles.input} type="range" min="1" max="50" step="1" id="sticker_height" name="height" value={stickersList[selectedSticker].height} onChange={changeStickerDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="sticker-radius" style={styles.label}>Radius</label>
                    <input style={styles.input} type="range" min="0" max="50" step="1" id="sticker_radius" name="radius" value={stickersList[selectedSticker].radius} onChange={changeStickerDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="sticker-rotation" style={styles.label}>Rotation</label>
                    <input style={styles.input} type="range" min="0" max="360" step="1" id="sticker_rotation" name="rotation" value={stickersList[selectedSticker].rotation} onChange={changeStickerDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="sticker-opacity" style={styles.label}>Opacity</label>
                    <input style={styles.input} type="range" min="0" max="1" step=".1" id="sticker_opacity" name="opacity" value={stickersList[selectedSticker].opacity} onChange={changeStickerDimensions}/>
                </div>

                <button style={styles.btn} onClick={deleteSelectedSticker}> Delete Sticker </button>

            </div>

            }
            
            {/* <button style={styles.btn}> {x ? 'Change Stickers' : 'Choose Stickers'}  </button> */}

            
            {/* <label labelfor="quality" style={styles.label}>Result Image quality</label>
            <input style={styles.input} type="range" min="1" max="3" step=".5" id="image-quality"/> */}
        </div>
    )
}

const styles ={
    filters:{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0 1rem 1rem 1rem',
        // border:'1px solid gray',
        // fontSize: '1rem',
        // boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .4)',
        minWidth:170,
        maxHeight:500,
        color:'gray'
    },
    background_div:{
        position:'relative'
    },
    background_img:{
        width:150,
        margin:'0',
        height:150,
        objectFit:'cover'
    },
    background_text_overlay:{
        width:150,
        position: 'absolute',
        bottom: 0,
        right:0,
        color:'#fff',
        backgroundColor:'black',
        opacity:'.5',
        fontSize:'1rem'
    },
    stickers_div:{
        display:'flex',
        flexDirection:'row',
        alignItems:'end',
        flexWrap: 'wrap',
        margin:'.1rem',
        padding:'.1rem',
        width:150,
        hieght:150,
        // border:'1px solid black'
    },
    sticker_div:{
        position:'relative',
    },
    sticker:{
        width:45,
        height:45,
        // objectFit:'cover',
        margin:'.1rem'
    },
    sticker_text_overlay:{
        width:45,
        position: 'absolute',
        bottom: 0,
        color:'#fff',
        backgroundColor:'black',
        opacity:'.5',
        fontSize:'1rem'
    },
    sticker_add_div:{
        width:45,
        height: 45,
        margin:'.2rem',
        border:'1px dashed black',
        backgroundColor:'transparent',
        // color:'#fff',
        fontSize:'.8rem',
        display:'flex',
        alignItems:'center'
    },
    control_div:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'start'
    },
    label:{
        minWidth:'2rem',
        maxHeight: '1rem',
        margin:'.1rem',
        // backgroundColor:'#fff',
        // color:'white',
        fontSize:'1rem',
    },
    input:{
        minWidth:100,
    },
    add_background:{
        minWidth:150,
        minHeight: 150,
        margin:'.2rem',
        padding:'.5rem',
        border:'2px dashed black',
        backgroundColor:'transparent',
        // color:'#fff',
        fontSize:'1rem',
        display:'flex',
        alignItems:'center'
    },
    btn:{
        minWidth:150,
        maxHeight: '2rem',
        margin:'.2rem',
        padding:'.5rem',
        border:'none',
        borderRadius:'1rem',
        // backgroundColor:'#fff',
        color:'white',
        fontSize:'1rem',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .7)',
        // linearGradient: 'gray black'
        backgroundImage: 'linear-gradient(to bottom left, #48A192,#066152)'
    },


}