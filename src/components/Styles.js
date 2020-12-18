import styled from 'styled-components';
import fullBloom from '../media/full-bloom.png';
import divImg from '../media/div.png';

export const Main = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: auto;
`;

export const Title = styled.h1`
  color: black;
  font-size: 60px;
  font-family: 'Bungee Shade';
  margin: 2px;
  text-align: center;
`;

export const Title4 = styled.span`
  color: black;
  font-size: 80px;
  font-family: 'Bungee Shade';
`;

export const AppDiv = styled.div`
  display: grid;
  align-content: center;
  justify-items: space-between;
  align-items: flex-start;
  grid-template-columns: auto auto auto;
  width: 70vw;
`;

export const HomePageDiv = styled.div`
    display: grid;
    width: 30vw;
    align-content: center;
    justify-items: center;
    align-items: flex-start;
    grid-template-columns: auto;
    margin-left: 20px;
    margin-right: 50px;
`;

export const BackToTop = styled.button`
    position: fixed;  
    bottom: 20px;
    right: 30px;
    z-index: 99;
    background-image: url(${fullBloom});
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
    color: black;
    outline: none;
    font-family: 'Narkisim';
`;

export const SearchInput = styled.input`
    border-radius: 20px;
    outline: none;
    background-color: rgba(200 , 200 , 200, 0.3);
    text-align: center;
    font-size: 16px;
    border: 2px solid darkgray;
    width: 120px;
    transition: width 0.4s linear ,border-color 0.4s linear;

    &:hover{
        border-color:black;
    }

    &:focus{
        width: 240px;
        border: 2px solid black;
    }
`;

export const Tag = styled.button`
    border-radius: 20px;
    color: gray;
    outline: none;
    background-color: rgba(200 , 200 , 200, 0.3);
    text-align: center;
    font-size: 16px;
    border: 2px solid darkgray;
    width: auto;
    transition: width 0.4s linear ,border-color 0.4s linear;
    margin: 5px;

    &:hover{
        border-color: red;
        color: red;
    }
`;

export const SortButton = styled.button`
    border-radius: 20px;
    color: gray;
    outline: none;
    background-color: rgba(200 , 200 , 200, 0.3);
    text-align: center;
    font-size: 16px;
    border: 2px solid darkgray;
    width: 120px;
    transition: width 0.4s linear ,border-color 0.4s linear;
    margin: 5px;

    &:hover{
        border-color: black !important;
        color: black !important;
    }
`;

export const DivText = styled.div`
    padding: 5px;
    color: white;
    font-size: 18px;
    font-family: 'Arial Black';
`;

export const PostDiv = styled.div`
    color: white;
    position: relative;
    width: 28vw;
    background-image: url(${divImg});
    border-radius: 20px;
    box-shadow: 8px 8px 10px black;
    font-size: 16px;
    padding: 20px;
    margin: 18px;
`;

export const SmallInfo = styled.div`
    color: darkgray;
    font-size: 12px; 
`;

export const PostTitle = styled.h2`
    font-size: 26px;
    text-decoration: underline;
    font-family: "Cooper Black";
    color: white;
`;

export const LikeDisplay = styled.span`
    color: darkgray;
    font-size: 18px; 
    border: 1px solid darkgray;
    border-radius: 50%;
    padding: 1px;
    padding-left: 4px;
    padding-right: 4px;
    margin: 2px;
    cursor: pointer;
`;

export const SaveButton = styled.button`
    border: none;
    background: transparent;
    position: absolute;
    z-index: 1;
    right: 20px;
    top: 10px;
    color: gray;
    cursor: pointer;
    font-size: 24px;
    font-family: "MV Boli";
    height: auto;
    outline: none;
    display: inline-block;
    opacity: 0;
    transition: opacity 0.4s linear;

    &:hover {
        color: white;
    }

    ${PostDiv}:hover & {
        opacity: 1;
      }
`;

export const InputComment = styled.input`
    border-radius: 20px;
    height: 20px;
    outline: none;
    background-color: rgba(200 , 200 , 200, 0.3);
    font-size: 16px;
    border: 2px solid darkgray;
    width: 12vw;
    padding: 5px;
    transition: all 0.4s linear;

    &:hover{
        border-color:black;
    }

    &:focus{
        width: 26vw;
        height: 60px;
        border: 2px solid black;
    }
`;

export const PostComment = styled.button`
    margin: 5px;
    overflow-y: hidden;
    color: white;
    height: 1px;
    outline: none;
    font-size: 1.3em;
    border-radius: 20px;
    font-weight: bold;
    border: 2px solid black;
    opacity: 0;
    transition: all 0.4s linear;
    background-image: url(${divImg});

    ${InputComment}:focus + & {
        height: 30px;
        opacity: 1;
        display: block;
    }

    &:focus {
        height: 30px;
        opacity: 1;
        display: block;
    }
`;

export const LinkSpan = styled.span`
&:hover {
    cursor: pointer;
    color: lightblue;
    font-wight: bold;
    text-decoration: underline;
`;

export const Button = styled.button`
    margin: 5px;
    color: black;
    outline: none;
    font-size: 1.3em;
    border-radius: 20px;
    font-weight: bold;
    border: 2px solid black;
    cursor: pointer;
    font-family: 'Narkisim';
    padding: 5px;
`;

export const SmallButton = styled.button`
    margin: 5px;
    color: black;
    outline: none;
    font-size: 1em;
    border-radius: 10px;
    font-weight: bold;
    border: 2px solid black;
    cursor: pointer;
    font-family: 'Narkisim';
    padding: 5px;
`;

export const ProfileDiv = styled.div`
    display: grid;
    align-content: center;
    justify-items: center;
    align-items: flex-start;
    grid-template-columns: auto;  
    color: black;
    position: relative;
    width: 18vw;
    background-image: url(${fullBloom});
    border-radius: 20px;
    border: 2px solid black;
    box-shadow: 4px 4px 6px black;
    font-size: 16px;
    padding: 10px;
    margin: 20px;
`;

export const MainImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: black;
    margin: 15px;
    border-radius: 50%;
    border: 2px solid black;
    outline: none;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${props => props.url});
`;

export const SideText = styled.p`
    font-size: 18px;
    font-family: 'Narkisim';
    color: black;
`;

export const SideTitle = styled.div`
    font-size: 24px;
    font-family: 'Bodoni MT Black';
    color: black;
`;

export const ProfileSubTitle = styled.div`
    margin: 5px;
    font-size: 18px;
    font-family: 'MV Boli';
    color: black;
`;

export const TextInput = styled.input`
    background: rgba(100 , 100 , 100 , 0.3);
    border: 0;
    border-bottom: 2px solid gray;
    color: black;
    padding: 2px;
    font-size: 20px;
    font-family: 'Narkisim';
    outline: none;
    transition: all 0.4s linear;
    width: 90%;

    &:focus {
        background: white;
        box-shadow: 4px 4px 4px gray;
        border-bottom: 2px solid black;
    }
`;

export const TextArea = styled.textarea`
    background: rgba(100 , 100 , 100 , 0.3);
    border: 0;
    border-bottom: 2px solid gray;
    color: black;
    padding: 2px;
    font-size: 20px;
    font-family: 'Narkisim';
    outline: none;
    transition: all 0.4s linear;
    width: 90%;
    height: 12vh;
    resize: none;

    &:focus {
        background: white;
        box-shadow: 4px 4px 4px gray;
        border-bottom: 2px solid black;
    }
`;

