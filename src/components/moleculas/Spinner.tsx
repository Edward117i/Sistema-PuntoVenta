import styled from "styled-components";
import { PulseLoader } from 'react-spinners'

export function Spinner() {
    return (<Container>
        <PulseLoader color="#78a3c4" size={24} />
    </Container>)
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bgtotal};
`