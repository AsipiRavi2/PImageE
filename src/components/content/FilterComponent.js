
import React, { useState } from 'react'
// import sticker from '../../assets/sticker.png'
// import bg from '../../assets/bedroom.jpeg'
// import bg1 from '../../assets/living.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { addBackground } from '../../features/background/backgroundSlice';
import { addSticker, changeDimensions, deleteSticker } from '../../features/sticker/stickerSlice';
import { addText, changeDimensionsText, deleteText} from '../../features/text/textSlice';

export default function FilterComponent() {

    const backgroundImage = useSelector(state => state.background.url)

    const stickersList =  useSelector(state => state.stickers.stickersList)
    const stickersListLength = stickersList.length

    const textsList =  useSelector(state => state.texts.textsList)
    const textsListLength = textsList.length

    const dispatch = useDispatch()

    const [selectedSticker, setSelectedSticker ] = useState(null)
    const [selectedText, setSelectedText ] = useState(null)
    
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

    //functions related to sticker

    function chooseStickerFile(){
        document.getElementById("sticker_file").value=""
        document.getElementById("sticker_file").click()
    }

    function onStickerFileChange(event)
    {   
        if (event.target.files && event.target.files[0]) {
            if(event.target.files[0].size/1024/1024<=5){
                const stickerDetails = {
                    id:parseInt(Date.now()),
                    url:URL.createObjectURL(event.target.files[0]),
                    width:20,
                    // height:20,
                    top: (stickersListLength+1)*10,
                    left: (stickersListLength+1)*10,
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


    function selectSticker(i){

        

        var filterStickerDiv = document.getElementById("filter_sticker_id_".concat(i))
        filterStickerDiv.style.border = '1px solid black';

        for (let j=0; j<stickersListLength; j++){
            if(i!==j){
                document.getElementById("filter_sticker_id_".concat(j)).style.border = 'none';
            }
        }

        setSelectedSticker(i)
        if(selectedText !== null){
            console.log(selectedText)
            document.getElementById("filter_text_id_".concat(selectedText)).style.border = 'none'
            setSelectedText(null)
        } 

        
    }

    function changeStickerDimensions(e){
        dispatch(changeDimensions({'index':selectedSticker,'name':e.target.name,'value':e.target.value}))
    }

    function deleteSelectedSticker(){
        dispatch(deleteSticker({'index':selectedSticker}))
        setSelectedSticker(null)
    }

    //functions related to text
    function addTextDiv(){
        console.log(textsList)
        const textDetails = {
            id: textsListLength > 0 ? textsList[textsListLength-1].id+1 : 0,
            info: "Type in your text",
            color:'black',
            size:'1',
            width:10,
            top: (stickersListLength+textsListLength+1)*10,
            left: (stickersListLength+textsListLength+1)*10,
            weight:700,
            opacity: 1,
            rotation: 0,
        }

        dispatch(addText(textDetails))
    }

    function selectText(i){
        var filterTextDiv = document.getElementById("filter_text_id_".concat(i))
        filterTextDiv.style.border = '1px solid black';

        for (let j=0; j<textsListLength; j++){
            if(i!==j){
                document.getElementById("filter_text_id_".concat(j)).style.border = 'none';
            }
        }
        
        if(selectedSticker !== null){
            console.log(selectedSticker)
            document.getElementById("filter_sticker_id_".concat(selectedSticker)).style.border = 'none'
            setSelectedSticker(null)
        } 

        setSelectedText(i)
    }

    function changeTextDimensions(e){
        dispatch(changeDimensionsText({'index':selectedText,'name':e.target.name,'value':e.target.value}))
    }

    function deleteSelectedText(){
        dispatch(deleteText({'index':selectedText}))
        setSelectedText(null)
    }


    return (
        <div style={styles.filters}>

            { backgroundImage 
            ? 
                <div style={styles.background_div}>
                    <img src={backgroundImage} alt="background_img" style={styles.background_img}/>
                    <div style={styles.background_text_overlay}>
                        <input type="file" style={{display:"none"}} id="background_file" onChange={onBackgroundFileChange}></input>
                        <div onClick={chooseBackgroundFile}> &#x1F58A; </div>
                    </div>
                </div>
            :
                <div style={styles.add_background} > 
                    <input type="file" style={{display:"none"}} id="background_file" onChange={onBackgroundFileChange}></input>
                    <div onClick={chooseBackgroundFile}> Choose Background Image </div>
                </div>
            }

            {/* filter Sticker div */}
            { backgroundImage
            &&
            <div style={styles.stickers_div}>

                <div style={styles.sticker_add_div} > 
                    <div>
                        <input type="file" style={{display:"none"}} id="sticker_file" onChange={onStickerFileChange}></input>
                        <div onClick={chooseStickerFile}> 
                            <b>+</b> Sticker
                        </div>
                    </div>
                </div>

                <div style={styles.sticker_add_div} > 
                        <div onClick={addTextDiv} > 
                        <b>+</b> Text
                        </div>
                </div>

                {stickersList.length>0
                && 
                stickersList.map((sticker,i)=>
                    <div style={styles.sticker_div} key={i} id={"filter_sticker_id_".concat(i)}>
                        <img src={sticker.url} alt="sticker" style={styles.sticker} onClick={()=>selectSticker(i)}/>
                    </div>

                    )
                }

                {textsList.length>0
                && 
                textsList.map((text,i)=>
                    <div style={styles.text_div} key={i} id={"filter_text_id_".concat(i)}>
                        <span style={styles.text} onClick={()=>selectText(i)}>{text.info}</span>
                    </div>
                    )
                }
            </div>
            }


            { backgroundImage
            &&
            selectedSticker!==null
            &&
            <div>
                <div style={styles.control_div}>
                    <label labelfor="sticker-width" style={styles.label}>Width</label>
                    <input style={styles.input} type="range" min="1" max="50" step="1" id="sticker_width" name="width" value={stickersList[selectedSticker].width} onChange={changeStickerDimensions}/>
                </div>

                {/* <div style={styles.control_div}>
                    <label labelfor="sticker-height" style={styles.label}>Height</label>
                    <input style={styles.input} type="range" min="1" max="50" step="1" id="sticker_height" name="height" value={stickersList[selectedSticker].height} onChange={changeStickerDimensions}/>
                </div> */}

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
                
                <div style={styles.control_div}>
                    <button style={styles.btn} onClick={deleteSelectedSticker}> Remove Sticker </button>
                </div>
            </div>

            }

            { backgroundImage
            &&
            selectedText!==null
            &&
            <div>

                <div style={styles.control_div}>
                    <label labelfor="text-info" style={styles.label}>Text</label>
                    <input style={styles.input} type="text" id="text_info" name="info" value={textsList[selectedText].info} onChange={changeTextDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="text-size" style={styles.label}>size</label>
                    <input style={styles.input} type="range" min="1" max="5" step=".2" id="text_size" name="size" value={textsList[selectedText].size} onChange={changeTextDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="text-color" style={styles.label}>color</label>
                    <input style={styles.input} type="color" id="text_color" name="color" value={textsList[selectedText].color} onChange={changeTextDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="text-width" style={styles.label}>Width</label>
                    <input style={styles.input} type="range" min="10" max="100" step="1" id="text_width" name="width" value={textsList[selectedText].width} onChange={changeTextDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="text-weight" style={styles.label}>Weight</label>
                    <input style={styles.input} type="range" min="100" max="1000" step="100" id="text_weight" name="weight" value={textsList[selectedText].weight} onChange={changeTextDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="text-rotation" style={styles.label}>Rotation</label>
                    <input style={styles.input} type="range" min="0" max="360" step="1" id="text_rotation" name="rotation" value={textsList[selectedText].rotation} onChange={changeTextDimensions}/>
                </div>

                <div style={styles.control_div}>
                    <label labelfor="text-opacity" style={styles.label}>Opacity</label>
                    <input style={styles.input} type="range" min="0" max="1" step=".1" id="text_opacity" name="opacity" value={textsList[selectedText].opacity} onChange={changeTextDimensions}/>
                </div>
                
                <div style={styles.control_div}>
                    <button style={styles.btn} onClick={deleteSelectedText}> Remove Text </button>
                </div>
            </div>

            }

        </div>
    )
}

const styles ={
    filters:{
        display: 'flex',
        alignItems: 'start',
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0 1rem 1rem 1rem',
        // border:'1px solid gray',
        // fontSize: '1rem',
        // boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .4)',
        minWidth:180,
        // maxHeight:500,
        color:'gray'
    },
    background_div:{
        position:'relative',
        // border:'.25rem solid gray',
        maxHeight:150,
    },
    background_img:{
        width:170,
        maxHeight:150,
    },
    background_text_overlay:{
        minWidth:'2rem',
        position: 'absolute',
        bottom: 0,
        right:0,
        color:'#fff',
        backgroundColor:'black',
        opacity:.8
    },
    stickers_div:{
        display:'flex',
        flexDirection:'row',
        alignItems:'start',
        justifyContent:'center',
        flexWrap: 'wrap',
        margin:'.1rem',
        padding:'.1rem',
        // width:150,
        // hieght:150,
        // border:'1px solid black'
    },
    sticker_div:{
        // position:'relative',
        width:52,
        height:52,
    },
    sticker:{
        width:50,
        height:50,
        objectFit:'cover',
        padding:'1px'
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
        width:60,
        height: '2rem',
        margin:'.2rem',
        border:'1px dashed black',
        backgroundColor:'transparent',
        // color:'#fff',
        fontSize:'.8rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },

    text_div:{
        // position:'relative',
        width:52,
        height:52,
    },
    text:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:50,
        height:50,
        margin:'1px',
        backgroundColor:'gray',
        color:'black',
        overflow:'hidden',
        fontSize:'.5rem'
    },
    control_div:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'end'
    },
    label:{
        width:60,
        margin:'.1rem',
        fontSize:'.8rem',
        textAlign:'left'
    },
    input:{
        maxWidth:90,
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
        margin:'.3rem',
        padding:'.2rem .5rem .2rem .5rem',
        border:'none',
        borderRadius:'.2rem',
        // backgroundColor:'#21212',
        color:'gray',
        // fontSize:'1rem',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, .7)',
        // backgroundImage: 'linear-gradient(to bottom left, #48A192,#066152)'
    },


}