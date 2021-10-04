import React from 'react'
import { useSelector } from 'react-redux';
// import bg from '../../assets/bedroom.jpeg'
// import sticker from '../../assets/batman.png'
import '../../App.css';

export default function CanvasComponent() {

    const backgroundImage = useSelector(state => state.background.url)
    const stickersList = useSelector(state => state.stickers.stickersList)
    // const dispatch = useDispatch()

    function dragElement(stickerId) {
        var stickerDiv = document.getElementById(stickerId);
        console.log(stickerId,stickerDiv)
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (stickerDiv) {
          /* if present, the header is where you move the DIV from:*/
          stickerDiv.onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          stickerDiv.onmousedown = dragMouseDown;
        }

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

            stickerDiv.style.top = (stickerDiv.offsetTop - pos2) + "px";
            stickerDiv.style.left = (stickerDiv.offsetLeft - pos1) + "px";
            
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
                        style={{width:sticker.width+'%', height:sticker.height+'%', borderRadius:sticker.radius+'%', opacity:sticker.opacity, top:(i+1)*10+'px', right:(i+1)*10+'px', transform:'rotate('+sticker.rotation+'deg)'}} 
                        id={"sticker_div_id_".concat(i)} 
                        onMouseOver={()=>dragElement("sticker_div_id_".concat(i))}
                    />
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
        // margin:	0,
        // padding: '1rem',
        maxWidth:'1000px',
        minWidth:'300px',
        overflow:'hidden',
    },
    background:{
        position:'relative',
        top:0,
        left:0,
        zIndex:0,
        width:'100%',
        objectFit:'cover',
    },
}