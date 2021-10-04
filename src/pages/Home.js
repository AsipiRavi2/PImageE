import React from 'react'
import Footer from '../sections/Footer'
import Header from '../sections/Header'
import Content from '../sections/home/Content'

export default function Home() {
    return (
        <div style={styles.home}>
            <Header />
            <div style={styles.content_div}>
                <Content />
            </div>
            <Footer />
        </div>
    )
}


const styles ={
    home:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    content_div:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: 500,
    }
}