
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        text-decoration: none;
        outline: 0;
        padding: 0;
        border: 0;
        margin: 0;
        word-break: break-word;
    }
    
    button {
        cursor: pointer;
    }
    html, body, #root {
        background-color:#585858;
    }
    font-family: 'Roboto', sans-serif;
`;