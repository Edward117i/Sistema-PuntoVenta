import styled from "styled-components";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {v} from "../../styles/variables";

export function ImageContent({image}:any){
    return (
        <Container>
            <LazyLoadImage placeholderSrc={<v.iconoreact/>}
            effect="black-and-white" src={image} width={50} height={50}>
            </LazyLoadImage>
        </Container>
    ); 
}

const Container = styled.div`
width: 50px;
height:50px;
border-radius: 10%;
overflow: hidden;
img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
`