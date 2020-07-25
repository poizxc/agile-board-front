import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    font-family:sans-serif;
  }
  html {
    box-sizing: border-box;
 }
  *,
  *::before,
  *::after {
    box-sizing:inherit;
 }
`;
