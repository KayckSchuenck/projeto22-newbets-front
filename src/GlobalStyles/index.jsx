
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
        font-family: 'Lato', sans-serif;
        h1 {
        color: black;
        font-weight: 700;
        font-size: 17px;
        margin-top: 0;
        @media (max-width:673px){
            font-size:15px
        }
        }
        
    }
    body::-webkit-scrollbar {
        width: 10px;               
    }

    body::-webkit-scrollbar-track {
        background: #012901;   
    }

    body::-webkit-scrollbar-thumb {
        background-color: gray;    
        border-radius: 20px;      
        border: 3px solid grey;  
    }
`;