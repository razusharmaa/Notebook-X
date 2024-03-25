import React from 'react';
import {
    MDBFooter,

    MDBBtn
} from 'mdb-react-ui-kit';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function App() {
    return (
        <MDBFooter className='bg-light text-center text-white'>
            <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#3b5998' }}
                href='https://www.facebook.com/razu.sharmaa/'
                role='button'
                target="_blank"
            >
                <FaFacebookF />
            </MDBBtn>

            <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#55acee' }}
                href='https://twitter.com/razu_sharmaa'
                role='button'
                target="_blank"
            >
                <FaTwitter />
            </MDBBtn>

            <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#ac2bac' }}
                href='https://www.instagram.com/razu.sharmaa/'
                role='button'
                target="_blank"
            >
                <FaInstagram />
            </MDBBtn>

            <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#0082ca' }}
                href='https://www.linkedin.com/in/razusharmaa/'
                role='button'
                target="_blank"
            >
                <FaLinkedinIn />
            </MDBBtn>

            <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#333333' }}
                href='https://github.com/razusharmaa'
                role='button'
                target="_blank"
            >
                <FaGithub />
            </MDBBtn>


            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Copyright:
                <a className='text-white' href='https://mdbootstrap.com/'>
                    Notebook-X.com
                </a>
            </div>
        </MDBFooter>
    );
}