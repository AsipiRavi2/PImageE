import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import bg from '../../assets/bedroom.jpeg'
// import sticker from '../../assets/batman.png'
import '../../App.css';
import { changeDimensions } from '../../features/sticker/stickerSlice';
import { changeDimensionsText } from '../../features/text/textSlice';

export default function CanvasComponent() {

    const backgroundImage = useSelector(state => state.background.url)
    const stickersList = useSelector(state => state.stickers.stickersList)
    const textsList = useSelector(state => state.texts.textsList)
    const dispatch = useDispatch()

    function dragElement(elementId,index) {
        var elementDiv = document.getElementById(elementId);
        // console.log(elementId,elementDiv)
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        elementDiv.onmousedown = dragMouseDown;
        // if (elementDiv) {
        //   /* if present, the header is where you move the DIV from:*/
        //   elementDiv.onmousedown = dragMouseDown;
        // } else {
        //   /* otherwise, move the DIV from anywhere inside the DIV:*/
        //   elementDiv.onmousedown = dragMouseDown;
        // }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:

            // elementDiv.style.top = (elementDiv.offsetTop - pos2) + "px";
            // elementDiv.style.left = (elementDiv.offsetLeft - pos1) + "px";
            if(elementId.includes('sticker')){
                dispatch(changeDimensions({'index':index,'name':'top','value':elementDiv.offsetTop - pos2}))
                dispatch(changeDimensions({'index':index,'name':'left','value':elementDiv.offsetLeft - pos1}))   
            }
            else{
                dispatch(changeDimensionsText({'index':index,'name':'top','value':elementDiv.offsetTop - pos2}))
                dispatch(changeDimensionsText({'index':index,'name':'left','value':elementDiv.offsetLeft - pos1}))   
            }
                
            //console.log(stickerDiv.offsetTop,stickerDiv.offsetLeft,stickerDiv.offsetRight,stickerDiv.offsetBottom)
            // console.log(document.getElementById('canvas').offsetTop,document.getElementById('canvas').offsetLeft)
            // var width = document.getElementById('canvas').clientWidth;
            // var height = document.getElementById('canvas').clientHeight;

            // console.log(width,height)
            
            //console.log((stickerDiv.offsetTop - pos2>20 && stickerDiv.offsetTop - pos2<height-150) && (stickerDiv.offsetLeft - pos1>20 && stickerDiv.offsetLeft - pos1<width-150))
            // if((stickerDiv.offsetTop - pos2>20 && stickerDiv.offsetTop - pos2<height-150) && (stickerDiv.offsetLeft - pos1>20 && stickerDiv.offsetLeft - pos1<width-150)){
            //     stickerDiv.style.top = (stickerDiv.offsetTop - pos2) + "px";
            //     stickerDiv.style.left = (stickerDiv.offsetLeft - pos1) + "px";
            //     //console.log(stickerDiv.style.top,stickerDiv.style.left)
            // }
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


    return (

        <>
        {backgroundImage
        &&
        <div style={styles.canvas} id="canvas">
            <div>
                <img src={backgroundImage} alt="background" style={styles.background} id="background-image"></img>
            </div>

            <div>
                { stickersList
                &&
                stickersList.map((sticker,i)=>
                    <img 
                        className="sticker"
                        key={"sticker".concat(i)} 
                        src={sticker.url} 
                        alt={"sticker".concat(i)} 
                        // style={{width:sticker.width+'%',  borderRadius:sticker.radius+'%', opacity:sticker.opacity, top:(i+1)*10+'px', right:(i+1)*10+'px', transform:'rotate('+sticker.rotation+'deg)'}} 
                        style={{width:sticker.width+'%',  borderRadius:sticker.radius+'%', opacity:sticker.opacity, top:sticker.top+'px', left:sticker.left+'px', transform:'rotate('+sticker.rotation+'deg)'}} 
                        id={"sticker_div_id_".concat(i)} 
                        onMouseOver={()=>dragElement("sticker_div_id_".concat(i),i)}
                        // onTouchMove={()=>dragElement("sticker_div_id_".concat(i))}
                    />
                ) 
                }
            </div>

            <div>
                { textsList
                &&
                textsList.map((text,i)=>
                    <div 
                        className="text"
                        key={"text".concat(i)}
                        // style={{width:text.width+'%', fontWeight:text.weight, color:text.color, fontSize:text.size+'rem', opacity:text.opacity, top:(i+1)*10+'px', right:(i+1)*10+'px', transform:'rotate('+text.rotation+'deg)'}} 
                        style={{width:text.width+'%', fontWeight:text.weight, color:text.color, fontSize:text.size+'rem', opacity:text.opacity, top:text.top+'px', left:text.left+'px', transform:'rotate('+text.rotation+'deg)'}}
                        id={"text_div_id_".concat(i)} 
                        onMouseOver={()=>dragElement("text_div_id_".concat(i),i)}
                        // onTouchMove={()=>dragElement("text_div_id_".concat(i))}
                    
                    >
                        {text.info}
                    </div>

                ) 
                }
            </div>
        </div> 
        }
        </>
    )
}

const styles ={
    canvas:{
        position:'relative',
        maxWidth:'1000px',
        minWidth:'300px',
        overflow:'hidden',
        height:'100%',
        // border:'1px solid black'
    },
    background:{
        position:'relative',
        top:0,
        left:0,
        zIndex:0,
        width:'100%',
        // height:'inherit',
        objectFit:'cover',
    },
}