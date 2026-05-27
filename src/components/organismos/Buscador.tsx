import styled, { ThemeConsumer } from "styled-components";
import {v} from "../../styles/variables"

export function Buscador() {
    return (
        <Container>
            <section className="content">
                <v.iconobuscar/>
               <input placeholder="....Buscar"/> 
            </section>

        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    height: 60px;
    align-items: center;
    display: flex;
    background: ${(props: any) => props.theme.inputBackground};
    color: ${(props: any) => props.theme.text};
    border: 2px solid ${(props: any) => props.theme.color2};

    .content{
        padding: 15px;
        gap: 10px;
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        .icono{
            font-size: 18px;
        }
        .input{
            font-size: 18px;
            width: 100%;
            outline: none;
            background: none;
            border: none;
            color: ${(props)=> props.theme.text};
        }
    }
`